import { Router } from "itty-router";
import { Database } from "@cloudflare/d1";

export interface Env {
  DB: Database;
}

type PasteSchema = {
  id: number;
  content: string;
  timestamp: string;
};

type PasteInput = {
  content: string;
};

const router = Router();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

router.get(
  "/pastes/:id",
  async ({ params }: { params: { id: string } }, env: Env) => {
    const id = parseInt(params.id, 10);
    await createTableIfNotExists(env.DB, "pastes");
    return new Response(
      JSON.stringify(await getMessage(env.DB, "pastes", id)),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        status: 200,
      }
    );
  }
);

router.get("/pastes", async (request: Request, env: Env) => {
  await createTableIfNotExists(env.DB, "pastes");
  return new Response(JSON.stringify(await getMessages(env.DB, "pastes")), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
    status: 200,
  });
});

router.put("/pastes", async (request: Request, env: Env) => {
  const body = (await request.json()) as PasteInput;
  const parsedBody = {
    content: JSON.stringify(body.content),
  };
  if (body.content !== undefined) {
    await createTableIfNotExists(env.DB, "pastes");
    const id = await insertMessage(env.DB, "pastes", parsedBody);
    return new Response(JSON.stringify({ id }), {
      status: 201,
      headers: corsHeaders,
    });
  }
  return new Response("", { status: 400, headers: corsHeaders });
});

router.delete(
  "/pastes/:id",
  async ({ params }: { params: { id: string } }, env: Env) => {
    const id = parseInt(params.id, 10);
    await deleteMessage(env.DB, "pastes", id);
    return new Response("", { status: 200, headers: corsHeaders });
  }
);

router.options("/pastes", handleOptions);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router.handle(request, env);
  },
};

const createTableIfNotExists = async (db: Database, tableName: string) => {
  return await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY,
        content TEXT,
        timestamp TEXT
      )`
    )
    .run();
};

const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );
};

const insertMessage = async (
  db: Database,
  tableName: string,
  { content }: PasteInput
) => {
  const id = uniqueId();
  console.log(content, id);
  await db
    .prepare(
      `INSERT INTO ${tableName} (id, content, timestamp) VALUES (?, ?, datetime())`
    )
    .bind(id, content)
    .run();
  return id;
};

const getMessage = async (
  db: Database,
  tableName: string,
  id: number
): Promise<PasteSchema | undefined> => {
  const message = await db
    .prepare(`SELECT * FROM ${tableName} WHERE id = ?`)
    .bind(id)
    .first();
  if (!message) return undefined;
  return message as PasteSchema;
};

const getMessages = async (db: Database, tableName: string) => {
  const messages = await db.prepare(`SELECT * FROM ${tableName}`).all();
  return messages.results;
};

const deleteMessage = async (db: Database, tableName: string, id: number) => {
  await db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).bind(id).run();
  return id;
};

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      )!,
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}
