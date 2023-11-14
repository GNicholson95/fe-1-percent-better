import React, { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
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

const Stack = createStackNavigator();

const App = () => {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ProfileHeader />
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
            <Stack.Screen name="UserCreation" component={UserCreation} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            {/* Other screens */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserContext.Provider>
  );
};

export default App;
