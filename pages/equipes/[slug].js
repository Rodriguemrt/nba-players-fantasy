import { useRouter } from "next/router";
import { getEquipeById, getJoueurByTeams, getJoueurs } from "../api/req";
import styles from "./equipe.module.css";

export default function BlogPost({ equipe, joueurs }) {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>{equipe.attributes.ville}</h1>
          <h2>{equipe.attributes.nom}</h2>
        </div>
      </div>
      <div>
        {/* Ne marche pas 
         <div>
          Joueurs:
          {joueurs.map((joueur, index) => {
            console.log(joueur);
            return (
              <>
                <ul key={index}>
                  {joueur.attributes.Prenom} -{joueur.attributes.Prenom}
                </ul>
                <ul> Age : {joueur.attributes.age}</ul>
                <ul> Numéro : {joueur.attributes.numero}</ul>
              </>
            );
          })}
        </div> */}
      </div>
      <button
        onClick={() => {
          router.push("/equipes");
        }}
      >
        {" "}
        Retour
      </button>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const query = getEquipeById(slug);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        slug: slug,
      },
    }),
  };

  // const optionsJoueurs = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     query: getJoueurByTeams(equipe.id),
  //     variables: {
  //       slug: slug,
  //     },
  //   }),
  // };

  const response = await fetch("http://127.0.0.1:1337/graphql", options);
  // const responseJoueurs = await fetch(
  //   "http://127.0.0.1:1337/graphql",
  //   optionsJoueurs
  // );

  const responseJson = await response.json();

  //Ne marche pas
  //const responseJsonJoueurs = await responseJoueurs.json();

  return {
    props: {
      equipe: responseJson.data?.equipes.data[0] || null,
      //joueurs: responseJsonJoueurs.data?.joueurs.data || null,
    },
  };
}

export async function getStaticPaths() {
  const query = `
    query {
        equipes {
            data {
                attributes {
                    ville
                }
            }
        }
    }`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch("http://127.0.0.1:1337/graphql", options);
  const responseJson = await response.json();

  const paths = responseJson.data.equipes.data.map((equipe) => {
    return `/equipes/${equipe.attributes.ville}`;
  });

  return {
    paths,
    fallback: false,
  };
}
