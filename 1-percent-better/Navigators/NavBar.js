import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DynamicScreen from "../screens/DynamicScreen";
import ExerciseList from "../screens/ExerciseList";
import MyExercisesScreen from "../screens/MyExercisesScreen";
import MySessionsScreen from "../screens/MySessionsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import LandingPage from "../screens/LandingPage";
import LoginScreen from "../screens/LoginScreen";
import { fetchUsernameByUserId } from "../services/userService";
import { useUserContext } from "../context/UserContext";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? "#555" : "#323939" },
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={options.tabBarIconName || "help-circle"}
              size={20}
              color={isFocused ? "white" : "grey"}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? "white" : "grey" },
                { flexWrap: "nowrap" },
              ]}

              // numberOfLines={1}
            >
              {options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#323939",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabLabel: {
    marginTop: 0,
    fontSize: 12,
  },
};

function NavBar() {
  const { user } = useUserContext();
  const [username, setUsername] = useState("My Profile");

  fetchUsernameByUserId(user)
    .then((username) => {
      setUsername(username);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Home"
      tabBarPosition="bottom"
      scrollEnabled={true}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 8, color: "yellow", flexWrap: "nowrap" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="DynamicScreen"
        component={DynamicScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIconName: "home",
        }}
      />
      <Tab.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{
          tabBarLabel: "All Exercises",
          tabBarIconName: "barbell-outline",
        }}
      />
      <Tab.Screen
        name="MyExercises"
        component={MyExercisesScreen}
        options={{
          tabBarLabel: "My Exercises",
          tabBarIconName: "person-outline",
        }}
      />
      <Tab.Screen
        name="MySessions"
        component={MySessionsScreen}
        options={{
          tabBarLabel: "My Sessions",
          tabBarIconName: "fitness-outline",
        }}
      />
      <Tab.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          tabBarLabel: "Landing (temp)",
          tabBarIconName: "",
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: `${username}`,
          tabBarIconName: "person",
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
