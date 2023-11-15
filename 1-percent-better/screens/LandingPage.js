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
        resizeMode='cover'
      />
      <View style={styles.overlay} />
      <View style={styles.heroContainer}>
        <Text style={styles.hero}>1 % Better</Text>
        <Text style={styles.subHero}>
          Your space for health, wellness and self improvement.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("UserCreation")}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View />
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  heroContainer: {
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: [{ translateX: -160 }, { translateY: -50 }],
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "left",
    width: 320,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  subHero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#a3a3a3",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  login: {
    fontSize: 34,
    color: primaryColor,
    fontWeight: "bold",
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingVertical: 9,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  signUp: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
});
export default LandingPage;
