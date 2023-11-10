import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import UserContext from "../context/UserContext"; // Import UserContext
import Toast from "react-native-root-toast";

const ExerciseCard = ({
  exercise,
  navigation,
  onAddExercise,
  buttonText = "Add to My Exercises",
}) => {
  const { userId } = useContext(UserContext); // Use useContext to access userId

  const handleAddExercise = async () => {
    try {
      const exerciseData = {
        userId,
        exBodypart: exercise.bodyPart,
        exName: exercise.name,
        exId: exercise.id,
      };
      await onAddExercise(exerciseData);
      Toast.show("Exercise added to My Exercises", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } catch (error) {
      console.error("Error adding exercise:", error);
      Toast.show("Error adding exercise", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

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

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddExercise} // Use handleAddExercise here
      >
        <Text style={styles.addButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e0e0e0",
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
    justifyContent: "space-between",
    alignItems: "top",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    color: "#59a6a6",
  },
  image: {
    width: 120, // Fixed width for the image
    height: 120, // Fixed height for the image
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff3c00",
    marginTop: 20,
  },

  addButton: {
    flex: 1,
    backgroundColor: "#4CAf50",
    padding: 1,
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    marginTop: 20,
    marginLeft: 10,
    height: 40,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 3,
  },
});

export default ExerciseCard;
