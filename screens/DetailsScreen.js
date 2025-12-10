import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const id = route?.params?.id;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Écran de détails</Text>
      {id !== undefined ? (
        <Text style={styles.detail}>ID reçu : {id}</Text>
      ) : (
        <Text style={styles.detail}>Aucun ID reçu</Text>
      )}
      <Button title="Revenir" onPress={() => navigation.goBack()} />
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
  detail: { fontSize: 16, marginBottom: 16, color: "#333" },
});
