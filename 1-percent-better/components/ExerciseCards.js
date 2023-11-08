import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExerciseCard = ({ exercise, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ExerciseDetailScreen", { exercise })}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{exercise.name.toUpperCase()}</Text>
        </View>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    height: 150,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // This will place the text and image on opposite ends
    alignItems: "top", // Center items vertically
    marginBottom: 10, // Space between the content and the button
  },
  textContainer: {
    flex: 1, // Allow text to take up as much space as possible
    marginRight: 10, // Add some margin between text and image
    color: "#59a6a6",
  },
  image: {
    width: 120, // Fixed width for the image
    height: 120, // Fixed height for the image
    borderRadius: 10, // Rounded corners for the image
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8a5c",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#75b0c7",
    borderRadius: 20,
    padding: 5,
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    marginTop: 30, // Space from the content above
    alignSelf: "left", // Center button in the card
  },
});

export default ExerciseCard;
