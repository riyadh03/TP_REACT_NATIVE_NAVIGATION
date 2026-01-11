import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";


// A) CODE NORMAL — API avec Axios et Fetch


// Axios
export const fetchTodosAxios = async () => {
  const response = await axios.get(`${API_URL}/todos?_limit=10`);
  return response.data;
};

// Fetch
export const fetchTodosFetch = async () => {
  const response = await fetch(`${API_URL}/todos?_limit=10`);

  if (!response.ok) {
    throw new Error("Erreur serveur");
  }

  return response.json();
};


// B) TEST DU RETARD (LOADER) ET DE L’ERREUR (COMMENTAIRE)


/*
Pour tester le loader et le message d’erreur :

1) Remplacer l’URL par une fausse :
   const API_URL = "https://jsonplaceholder.typicode.come";

2) Modifier la fonction fetchTodosFetch comme ceci :

export const fetchTodosFetch = async () => {

   // délai artificiel de 3 secondes
   await new Promise(resolve => setTimeout(resolve, 3000));

   const response = await fetch(`${API_URL}/todos?_limit=10`);

   if (!response.ok) {
     throw new Error("Erreur serveur");
   }

   return response.json();
};

Résultat attendu :
- Le loader (ActivityIndicator) s’affiche pendant 3 secondes
- Puis un message d’erreur s’affiche car l’API est invalide
*/
