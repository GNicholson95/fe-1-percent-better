import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHeader from "./components/ProfileHeader";
import DynamicScreen from "./screens/DynamicScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView>
      <ProfileHeader />
      <DynamicScreen />
    </SafeAreaView>
  );
}

export default App;
