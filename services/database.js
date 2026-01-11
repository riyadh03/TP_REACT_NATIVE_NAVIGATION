import { Platform } from "react-native";

let db = null;

if (Platform.OS !== "web") {
  const SQLite = require("expo-sqlite");
  db = SQLite.openDatabaseSync("todos.db");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      title TEXT
    );
  `);
}

export { db };

export const addTodoOffline = (title) => {
  if (!db) return;  // <-- protection Web
  db.runSync("INSERT INTO todos (id, title) VALUES (?, ?)", [
    Date.now(),
    title,
  ]);
};

export const updateTodoOffline = (id, title) => {
  if (!db) return;
  db.runSync("UPDATE todos SET title = ? WHERE id = ?", [title, id]);
};

export const deleteTodoOffline = (id) => {
  if (!db) return;
  db.runSync("DELETE FROM todos WHERE id = ?", [id]);
};

export const loadTodos = () => {
  if (!db) return [];
  return db.getAllSync("SELECT * FROM todos");
};
