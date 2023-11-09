import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DynamicScreen from "../screens/DynamicScreen";
import ExerciseList from "../screens/ExerciseList";
import MyExercisesScreen from "../screens/MyExercisesScreen";
import MySessionsScreen from "../screens/MySessionsScreen";

const Tab = createMaterialTopTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName='DynamicScreen'
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13, color: "#fd5732" },
        tabBarStyle: { backgroundColor: "#393939" },
      }}
    >
      <Tab.Screen
        name='DynamicScreen'
        component={DynamicScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name='ExerciseList'
        component={ExerciseList}
        options={{ tabBarLabel: "All Exercises" }}
      />

      <Tab.Screen
        name='MyExercises'
        component={MyExercisesScreen} // My Exercises
        options={{ tabBarLabel: "My Exercises" }} // Label for the tab
      />
      <Tab.Screen
        name='MySessions'
        component={MySessionsScreen} // My Sessions
        options={{ tabBarLabel: "My Sessions" }} // Label for the tab
      />
    </Tab.Navigator>
  );
}

export default NavBar;
