import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getJoueurs, getTeams } from "../api/req";
import { useRouter } from "next/router";

export default function Joueurs({ players }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA PLAYER FANTASY</title>
      </Head>
      <main>
        <h1 className={styles.title}>NBA PLAYER FANTASY</h1>
        <div className={styles.grid}>
          {players.map((player, index) => {
            return (
              <button
                key={index}
                className={styles.card}
                onClick={() => {
                  router.push(`/joueurs/${player.attributes.Nom}`);
                }}
              >
                <div>
                  <h3>Nom : {player.attributes.Nom}</h3>
                </div>
                Cliquez pour voir les joueurs
              </button>
            );
          })}
        </div>
        <div>
          <button onClick={() => router.push("/")}>Retour</button>
          <button onClick={() => router.push("/joueurs/create")}>
            Ajout d'une équipe
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const optionsJoueurs = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getJoueurs }),
  };

  const responseJoueurs = await fetch(
    "http://127.0.0.1:1337/graphql",
    optionsJoueurs
  );

  const responseJson = await responseJoueurs.json();

  return {
    props: {
      players: responseJson.data?.joueurs.data || [],
    },
  };
}
