import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Écran d'accueil</Text>
      <Text style={styles.subtitle}>Bienvenue sur la page d'accueil.</Text>
      <Button
        title="Aller aux détails"
        onPress={() => navigation.navigate("Details", { id: 42 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 20, marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 16, color: "#666" },
});
