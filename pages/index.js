import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getJoueurs, getTeams } from "./api/req";
import { useRouter } from "next/router";

export default function Home({ teams, players }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA PLAYER FANTASY</title>
      </Head>

      <main>
        <h1 className={styles.title}>NBA PLAYER FANTASY</h1>
        <div className={styles.grid}>Choisir un affichage</div>{" "}
        <button onClick={() => router.push("/equipes")}>Equipe</button>
        <button onClick={() => router.push("/joueurs")}>Joueurs</button>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const optionsTeams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getTeams }),
  };
  const optionsJoueurs = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getJoueurs }),
  };
  const responseTeams = await fetch(
    "http://127.0.0.1:1337/graphql",
    optionsTeams
  );
  const responseJoueurs = await fetch(
    "http://127.0.0.1:1337/graphql",
    optionsJoueurs
  );

  const responseJson = await responseTeams.json();
  const responseJsonJoueurs = await responseJoueurs.json();

  return {
    props: {
      teams: responseJson.data?.equipes.data || [],
      players: responseJsonJoueurs.data?.joueurs || [],
    },
  };
}
