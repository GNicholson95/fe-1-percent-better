import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

const AllExercisesCard = () => {
  const backgroundImage = require('../assets/All-exercises-image-1.jpg')
  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground source={backgroundImage} style={styles.imageBackground}></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.text}>All Exercises</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f1f1",
    marginBottom: 5,
    height: 190,
    // flex: 1,
    overflow: "hidden", // This is important for the ImageBackground

  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    position:"absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: [
      { translateX: -80 }, // takes text back by half of its width to centre completely
      { translateY: -8 },
    ],
  },

  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff8a5c",
  },
});

export default AllExercisesCard;
