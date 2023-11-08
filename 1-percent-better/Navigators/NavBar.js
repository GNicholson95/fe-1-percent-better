import * as React from "react";
import { Text, View, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../components/Home";
import AllExercisesCard from "../components/AllExercisesCard";
import DynamicScreen from "../screens/DynamicScreen";
import ExerciseList from "../screens/ExerciseList";

const Tab = createMaterialTopTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e64",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "gainsboro" },
      }}
    >
      <Tab.Screen
        name="DynamicScreen"
        component={DynamicScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Exercise List"
        component={ExerciseList}
        options={{ tabBarLabel: "Exercise List" }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
