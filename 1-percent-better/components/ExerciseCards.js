import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-root-toast";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "./ColorPallette";

const ExerciseCard = ({
  exercise,
  navigation,
  onAddExercise,
  buttonText = "Add to My Exercises",
}) => {
  const { user } = useUserContext();

  const handleAddExercise = async () => {
    try {
      const exerciseData = {
        user,
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
      accessible={true}
      accessibilityLabel='Exercise Details'
      accessibilityHint='Navigates to Exercise screen'
      onPress={() => navigation.navigate("Exercise Details", { exercise })}
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
        accessible={true}
        accessibilityLabel='Add Exercise'
        style={styles.addButton}
        onPress={handleAddExercise}
      >
        <Text style={styles.addButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: backgroundColor,
    borderColor: secondaryColor,
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
    color: "#59A6A6",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColor,
    marginTop: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: callToActionColor,
    padding: 1,
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    marginLeft: 10,
    marginBottom:10,
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
