import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getJoueurs, getTeams } from "../api/req";
import { useRouter } from "next/router";

export default function CreateEquipe() {
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
            <label>Ville :</label>
            <input type="text"></input>
            <label>Nom :</label>
            <input type="text"></input>
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
