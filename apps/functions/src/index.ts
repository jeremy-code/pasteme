export interface Env {
  PASTES: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response("Hello World!");
  },
};