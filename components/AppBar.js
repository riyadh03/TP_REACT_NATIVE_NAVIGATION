import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AppBar({ title, back }) {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", padding: 15, alignItems: "center", backgroundColor: "#2f80ed" }}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>⬅️</Text>
        </TouchableOpacity>
      )}
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
}
