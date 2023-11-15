import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MyExercisesCard = ({ onPress }) => {
  const backgroundImage = require("../assets/my-exercises-card.png");
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
      >
        <Text style={styles.text}>My Exercises</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 0,
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default MyExercisesCard;
