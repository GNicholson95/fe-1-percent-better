import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../context/UserContext";
import { addExerciseToUser } from "../services/AddExerciseToUser"; // Import the service function
import Toast from "react-native-root-toast";
import { callToActionColor } from "../components/ColorPallette";

const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise } = route.params;
  const { user } = useUserContext(); // Access the userId from UserContext

  const handleAddExercise = async () => {
    try {
      await addExerciseToUser(
        user,
        exercise.bodyPart,
        exercise.name,
        exercise.id
      );
      /// Show success toast message
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
      // Show error toast message
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
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>{exercise.name.toUpperCase()}</Text>
      <View style={[styles.labelContainer, styles.bodyPart]}>
        <Text style={styles.label}>Body Part</Text>
        <Text style={styles.value}>{exercise.bodyPart}</Text>
      </View>
      <View style={[styles.labelContainer, styles.equipment]}>
        <Text style={styles.label}>Equipment</Text>
        <Text style={styles.value}>{exercise.equipment}</Text>
      </View>
      <View style={[styles.labelContainer, styles.target]}>
        <Text style={styles.label}>Target</Text>
        <Text style={styles.value}>{exercise.target}</Text>
      </View>
      <View style={[styles.labelContainer, styles.secondaryMuscles]}>
        <Text style={styles.label}>Secondary Muscles</Text>
        <Text style={styles.value}>{exercise.secondaryMuscles.join(", ")}</Text>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.subtitle}>Instructions:</Text>
        {exercise.instructions.map((instruction, index) => (
          <Text key={index} style={styles.instruction}>{`${
            index + 1
          }. ${instruction}`}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  labelContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyPart: {
    backgroundColor: "#e2f9e1",
  },
  equipment: {
    backgroundColor: "#e8eaf6",
  },
  target: {
    backgroundColor: "#ffe0b2",
  },
  secondaryMuscles: {
    backgroundColor: "#ffcdd2",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  instruction: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 30,
  },
  instructionsContainer: {
    paddingBottom: 50,
  },
  addButton: {
    flex: 1,
    backgroundColor: callToActionColor,
    padding: 1,
    borderRadius: 20,

    bottom: 10,
    marginTop: 20,
    marginLeft: 10,
    height: 40,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 3,
  },
});

export default ExerciseDetailScreen;
