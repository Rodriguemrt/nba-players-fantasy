export const getTeams = `
    query{
            equipes{
                        data{id,
                        attributes{ville,nom}
                        }
				    }
        }
  `;

export const getJoueurs = `
   query {
        joueurs {
           data {
            id
            attributes {
             Nom,Prenom,numero,
            , age, equipe{data{attributes{ville,nom}}}
            }
          
          }
        }
      }`;

// Ne marche pas
export function getJoueurByTeams(id) {
  return `query {
        joueurs(where: {equipe{data{id:${id}}}}) {
           data {
            id
            attributes {
             Nom,Prenom,numero,
            , age, equipe{data{attributes{ville,nom}}}
            }
          
          }
        }
      }`;
}

export function getEquipeById(id) {
  return `
    query {
        equipes(filters: {ville: {eq: "${id}"}}) {
          data {
            id
            attributes {
             ville,
             nom
            }
          }
        }
      }`;
}

export function getJoueurById(id) {
  return `
    query {
        joueurs(filters: {Nom: {eq: "${id}"}}) {
           data {
            id
            attributes {
            Nom,
            Prenom,
            age,
            }
          
          }
        }
      }`;
}
