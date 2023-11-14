import React, { useState, useEffect } from "react";
import { UserProvider, useUserContext } from "./context/UserContext";
import { SafeAreaView } from "react-native";
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
      <SafeAreaView style={{ flex: 1 }}>
        {/* <ProfileHeader /> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
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
            {/* <Stack.Screen name="LandingPage" component={LandingPage} /> */}
            <Stack.Screen name="UserCreation" component={UserCreation} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SessionDetails" component={SessionDetails} />
            <Stack.Screen
              name="NewSessionScreen"
              component={NewSessionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddExerciseScreen"
              component={AddExerciseScreen}
            />
            {/* Other screens */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
};

export default App;
