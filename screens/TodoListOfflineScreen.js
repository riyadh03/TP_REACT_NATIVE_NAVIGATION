import { View, Text, FlatList, Button, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  loadTodos,
  addTodoOffline,
  updateTodoOffline,
  deleteTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const refreshTodos = () => {
    setTodos(loadTodos());
  };

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      addTodoOffline(title);
    }

    setTitle("");
    refreshTodos();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <>
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="Tâche offline"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />

        <Button
          title={editingId ? "✏️ Mettre à jour" : "➕ Ajouter"}
          onPress={handleAddOrUpdate}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Text>{item.title}</Text>

            <View style={{ flexDirection: "row" }}>
              <Button
                title="✏️"
                onPress={() => {
                  setTitle(item.title);
                  setEditingId(item.id);
                }}
              />

              <Button
                title="🗑️"
                onPress={() => {
                  deleteTodoOffline(item.id);
                  refreshTodos();
                }}
              />
            </View>
          </View>
        )}
      />
    </>
  );
}
