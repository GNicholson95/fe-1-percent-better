import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHeader from "./components/ProfileHeader";
import DynamicScreen from "./screens/DynamicScreen";
import ExerciseList from "./screens/ExerciseList";
import ExerciseDetailScreen from "./screens/ExerciseDetailScreen"; // Assuming you have this screen
import NavBar from "./Navigators/NavBar";
import LandingPage from "./screens/LandingPage";
import MySessionsScreen from "./screens/MySessionsScreen";
import MyExercisesScreen from "./screens/MyExercisesScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileHeader />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={NavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MySessionsScreen" component={MySessionsScreen} />
          <Stack.Screen
            name="MyExercisesScreen"
            component={MyExercisesScreen}
          />
          <Stack.Screen
            name="ExerciseDetailScreen"
            component={ExerciseDetailScreen}
          />
          {/* Other screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
