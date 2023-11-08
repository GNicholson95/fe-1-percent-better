import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHeader from "./components/ProfileHeader";
import DynamicScreen from "./screens/DynamicScreen";
import ExerciseList from "./screens/ExerciseList";
import NavBar from "./Navigators/NavBar";
import LandingPage from "./screens/LandingPage";
const Stack = createStackNavigator();

function App() {
  return (
    //  --------- UN-COMMENT BELOW TO VIEW LANDING PAGE
    // <View style={{ flex: 1 }}>
    //   <LandingPage/>
    // </View>
    //  --------- COMMENT OUT BELOW TO VIEW LANDING PAGE
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <ProfileHeader />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
