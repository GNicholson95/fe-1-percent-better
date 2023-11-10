import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DynamicScreen from "../screens/DynamicScreen";
import ExerciseList from "../screens/ExerciseList";
import MyExercisesScreen from "../screens/MyExercisesScreen";
import MySessionsScreen from "../screens/MySessionsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import LandingPage from "../screens/LandingPage";
import WorkoutDetail from "../screens/WorkoutDetail";

const Tab = createMaterialTopTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      swipeEnabled={true}
      scrollEnabled={true}
      // initialRouteName="DynamicScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 8,
          color: "yellow",
          flexWrap: "nowrap",
        },
        // tabBarLabelStyle: { fontSize: 13, color: "#fd5732" },
        tabBarStyle: { backgroundColor: "#323939" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="DynamicScreen"
        component={DynamicScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{
          tabBarLabel: "All Exercises",
          tabBarIcon: ({ color, size }) => (
            <Icon name="barbell-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyExercises"
        component={MyExercisesScreen} // My Exercises
        options={{
          tabBarLabel: "My Exercises",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MySessions"
        component={MySessionsScreen} // My Sessions
        options={{
          tabBarLabel: "My Sessions",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
