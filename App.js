import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthProvider, { AuthContext } from "./context/AuthContext";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AppBar from "./screens/AppBar";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#007AFF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Accueil"
        component={HomeScreen}
        options={{ title: "Accueil" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Mes Détails Personnalisés" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            <AppBar />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { backgroundColor: "#f0f0f0" },
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIcon: ({ color, size }) => {
                  if (route.name === "Maison") {
                    return <Ionicons name="home" size={size} color={color} />;
                  } else if (route.name === "Paramètres") {
                    return (
                      <Ionicons name="settings" size={size} color={color} />
                    );
                  }
                  return null;
                },
              })}
            >
              <Tab.Screen name="Maison" component={HomeStack} />
              <Tab.Screen name="Paramètres" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
});
