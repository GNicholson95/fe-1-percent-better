import * as React from "react";
import { Text, View, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../components/Home";
import AllExercisesCard from "../components/AllExercisesCard";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="AllExercisesCard"
        component={AllExercisesCard}
        options={{ tabBarLabel: "AllExercisesCard" }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
