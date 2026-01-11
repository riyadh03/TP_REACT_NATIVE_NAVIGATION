import { create } from "zustand";
import { db } from "../services/database";
import { 
  fetchTodosFromFirestore, 
  addTodoToFirestore 
} from "../services/firestore";

export const useTodoStore = create((set, get) => ({
  todos: [],

  // Charger les tâches
  loadTodos: async (uid) => {
    try {
      // 1️⃣ Récupérer les todos depuis Firestore
      const remoteTodos = await fetchTodosFromFirestore(uid);

      // 2️⃣ Mobile → injecter dans SQLite
      if (db) {
        db.transaction((tx) => {
          tx.executeSql("DELETE FROM todos");
          remoteTodos.forEach((t) => {
            tx.executeSql("INSERT INTO todos (id, title) VALUES (?, ?)", [
              Date.now(), // on génère un id local
              t.title,
            ]);
          });
        });

        // Charger SQLite vers Zustand
        db.transaction((tx) => {
          tx.executeSql("SELECT * FROM todos", [], (_, res) => {
            set({ todos: res.rows._array });
          });
        });
      } else {
        // 3️⃣ Web → utiliser directement Firestore
        set({ todos: remoteTodos });
      }
    } catch (e) {
      console.log("Erreur loadTodos:", e);
    }
  },

  // Ajouter une nouvelle tâche
  addTodo: async (uid, title) => {
    if (!title || !uid) return;

    try {
      // 1️⃣ Mobile → SQLite
      if (db) {
        db.transaction((tx) => {
          tx.executeSql("INSERT INTO todos (id, title) VALUES (?, ?)", [
            Date.now(),
            title,
          ]);
        });
      }

      // 2️⃣ Firestore → toujours
      await addTodoToFirestore(uid, {
        title,
        completed: false,
        createdAt: Date.now(),
      });

      // 3️⃣ Refresh → recharger la liste
      await get().loadTodos(uid);
    } catch (e) {
      console.log("Erreur addTodo:", e);
    }
  },

  // Supprimer une tâche
  deleteTodo: async (uid, id) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM todos WHERE id = ?", [id]);
      });
    }

    // Firestore
    // Si tu as une fonction deleteTodoFromFirestore(uid, id) → l’appeler ici

    await get().loadTodos(uid);
  },
}));
