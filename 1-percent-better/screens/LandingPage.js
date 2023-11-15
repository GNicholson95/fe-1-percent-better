import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import UserCreation from "./UserCreation";
import LoginScreen from "./LoginScreen";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        source={require("../assets/Login.mp4")}
        style={styles.videoBackground}
        isMuted={true}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <View style={styles.heroContainerContainer}>
        <Text style={styles.hero}>1 % better</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("UserCreation")}>
          <Text style={styles.login}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.signUp}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoBackground: {
    flex: 1,
  },
  heroContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  login: {
    fontSize: 34,
    color: "#ff8a5c",
    fontWeight: "bold",
  },
  signUp: {
    fontSize: 34,
    color: "#ff8a5c",
    fontWeight: "bold",
  },
});
export default LandingPage;
