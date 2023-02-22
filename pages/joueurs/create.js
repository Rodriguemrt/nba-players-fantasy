import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getJoueurs, getTeams } from "../api/req";
import { useRouter } from "next/router";

export default function CreateJoueur({ teams }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA PLAYER FANTASY</title>
      </Head>
      <main>
        <h1 className={styles.title}>NBA PLAYER FANTASY</h1>
        <div className={styles.grid}>
          <form>
            <label>Nom :</label>
            <input type="text"></input>
            <label>Prénom :</label>
            <input type="text"></input>
            <label>Age :</label>
            <input type="text"></input>
            <label>Numéro :</label>
            <input type="text"></input>
            <label>Équipe :</label>
            <select>
              {teams.map((team, index) => {
                return <option key={index}>{team.attributes.ville}</option>;
              })}
            </select>

            <button type="submit">Ok</button>
          </form>
        </div>
        <div>
          <button onClick={() => router.push(`/equipes`)}>Retour</button>
        </div>
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

  const responseTeams = await fetch(
    "http://127.0.0.1:1337/graphql",
    optionsTeams
  );

  const responseJson = await responseTeams.json();

  return {
    props: {
      teams: responseJson.data?.equipes.data || [],
    },
  };
}
