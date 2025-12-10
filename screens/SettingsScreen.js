import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Paramètres</Text>
      <Text style={styles.subtitle}>
        Ici tu pourras ajouter tes préférences.
      </Text>
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
  subtitle: { fontSize: 14, color: "#666" },
});
