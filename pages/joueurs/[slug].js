import { getJoueurById, getJoueurs } from "../api/req";

export default function Joueur({ joueur }) {
  return (
    <div>
      <h1>{joueur.attributes.Prenom}</h1>
      <h2>{joueur.attributes.Nom}</h2>
    </div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const query = getJoueurById(slug);

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

  const response = await fetch("http://127.0.0.1:1337/graphql", options);
  const responseJson = await response.json();

  return {
    props: {
      joueur: responseJson.data?.joueurs.data[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const query = getJoueurs;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch("http://127.0.0.1:1337/graphql", options);
  const responseJson = await response.json();

  const paths = responseJson.data.joueurs.data.map((joueur) => {
    return `/joueurs/${joueur.attributes.Nom}`;
  });

  return {
    paths,
    fallback: false,
  };
}
