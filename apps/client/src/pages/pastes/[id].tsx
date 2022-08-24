import { GetStaticProps } from "next";

type PasteProps = {
  id: string;
  content: string;
  timestamp: string;
};

const PastePage = ({ id, content, timestamp }: PasteProps) => {
  return (
    <div>
      <h1>Paste Page</h1>
      <h2>{id}</h2>
      <p>{content}</p>
      <p>{timestamp}</p>
    </div>
  );
};

type PasteType = {
  id: string;
  content: string;
  timestamp: string;
};

const dev = process.env.NODE_ENV !== "production";

export const API_BASE_URL = dev
  ? "http://localhost:8787"
  : "https://your_deployment.server.com";

export async function getStaticPaths() {
  const res = await fetch(`${API_BASE_URL}/pastes`);
  const pastes = await res?.json();
  const paths = pastes?.map((paste: PasteType) => ({
    params: { id: paste.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${API_BASE_URL}/pastes/${context?.params?.id}`);
  const paste = await res?.json();

  return {
    props: {
      id: paste?.id as string,
      content: paste?.content,
      timestamp: paste?.timestamp,
    },
  };
};

export default PastePage;
