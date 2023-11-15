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
import { useRoute } from "@react-navigation/native";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
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
            accessible={true}
            accessibilityLabel="Nav bar"
            key={index}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? "#00a67b" : "#e0e0e0" },
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={options.tabBarIconName || "help-circle"}
              size={20}
              color={isFocused ? "white" : "#00a67b"}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? "white" : "#00a67b" },
                { flexWrap: "nowrap" },
              ]}
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
    backgroundColor: "#00a67b",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabLabel: {
    marginTop: 0,
    fontSize: 13,
    fontWeight: "bold",
  },
};

function NavBar() {
  const { user } = useUserContext();
  const [username, setUsername] = useState("My Profile");
  const route = useRoute();

  if (user) {
    fetchUsernameByUserId(user)
      .then((username) => {
        setUsername(username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName={user ? "Home" : "LandingPage"}
      tabBarPosition="bottom"
      scrollEnabled={true}
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 8, color: "yellow", flexWrap: "nowrap" },
        tabBarShowLabel: false,
        tabBarButton: ["ExerciseList", "All Exercises", "MySessions"].includes(
          route.name
        )
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen
        name="DynamicScreen"
        component={DynamicScreen}
        options={{
          tabBarLabel: `${username}`,
          tabBarIconName: "home",
        }}
      />
      <Tab.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{
          tabBarLabel: "All Exercises",
          tabBarIconName: "book",
        }}
      />
      <Tab.Screen
        name="MyExercises"
        component={MyExercisesScreen}
        options={{
          tabBarLabel: "My Exercises",
          tabBarIconName: "person",
        }}
      />
      <Tab.Screen
        name="MySessions"
        component={MySessionsScreen}
        options={{
          tabBarLabel: "Sessions",
          tabBarIconName: "barbell",
        }}
      />
      {user ? null : (
        <>
          <Tab.Screen
            name="LandingPage"
            component={LandingPage}
            options={{
              tabBarLabel: "Sign Up",
              tabBarIconName: "add-circle-outline",
              tabBarVisible: false,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel: `${username}`,
              tabBarIconName: "person-add-outline",
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default NavBar;
