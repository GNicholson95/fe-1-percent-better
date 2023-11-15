import React, { useState, useEffect } from "react";
import { UserProvider, useUserContext } from "./context/UserContext";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHeader from "./components/ProfileHeader";
import DynamicScreen from "./screens/DynamicScreen";
import ExerciseList from "./screens/ExerciseList";
import ExerciseDetailScreen from "./screens/ExerciseDetailScreen";
import NavBar from "./Navigators/NavBar";
import LandingPage from "./screens/LandingPage";
import MySessionsScreen from "./screens/MySessionsScreen";
import MyExercisesScreen from "./screens/MyExercisesScreen";
import UserCreation from "./screens/UserCreation";
import LoginScreen from "./screens/LoginScreen";
import SessionDetails from "./screens/SessionDetails";
import NewSessionScreen from "./screens/NewSessionScreen";
import AddExerciseScreen from "./screens/AddExerciseScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Back"
              component={NavBar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MySessionsScreen"
              component={MySessionsScreen}
            />
            <Stack.Screen
              name="MyExercisesScreen"
              component={MyExercisesScreen}
            />
            <Stack.Screen
              name="ExerciseDetailScreen"
              component={ExerciseDetailScreen}
            />
            <Stack.Screen
              name="UserCreation"
              component={UserCreation}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen name="Session Details" component={SessionDetails} />
            <Stack.Screen
              name="NewSessionScreen"
              component={NewSessionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddExerciseScreen"
              component={AddExerciseScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
};

export default App;
