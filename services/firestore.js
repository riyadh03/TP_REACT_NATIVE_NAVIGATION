import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

/**
 * Récupère toutes les todos d’un utilisateur
 */
export async function fetchTodosFromFirestore(uid) {
  try {
    const todosCol = collection(db, "users", uid, "todos");
    const snapshot = await getDocs(todosCol);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.log("Erreur fetchTodosFromFirestore:", e);
    return [];
  }
}


export async function addTodoToFirestore(uid, todo) {
  try {
    const todosCol = collection(db, "users", uid, "todos");
    await addDoc(todosCol, {
      title: todo.title,
      completed: todo.completed || false,
      createdAt: todo.createdAt || Date.now(),
    });
  } catch (e) {
    console.log("Erreur addTodoToFirestore:", e);
  }
}

/**
 * Supprimer une tâche Firestore
 */
export async function deleteTodoFromFirestore(uid, todoId) {
  try {
    const todoDoc = doc(db, "users", uid, "todos", todoId);
    await deleteDoc(todoDoc);
  } catch (e) {
    console.log("Erreur deleteTodoFromFirestore:", e);
  }
}
