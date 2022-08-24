import { GetStaticProps } from "next";
import Link from "next/link";

type Paste = {
  id: string;
  content: string;
  timestamp: string;
};

type PastesPageProps = {
  pastes: Paste[];
};

const PastesPage = ({ pastes }: PastesPageProps) => {
  return (
    <div>
      <h1>Paste Page</h1>
      <ul>
        {pastes.map((paste) => (
          <li key={paste.id}>
            <Link href={`/pastes/${paste.id}`}>{paste.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const dev = process.env.NODE_ENV !== "production";

export const API_BASE_URL = dev
  ? "http://localhost:8787"
  : "https://pasteme-functions.jeremynguyen.workers.dev";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${API_BASE_URL}/pastes`);
  const pastes = await res?.json();

  return {
    props: {
      pastes,
    },
  };
};

export default PastesPage;
