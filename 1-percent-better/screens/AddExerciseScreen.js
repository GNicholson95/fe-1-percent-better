import React, { useState, useEffect, navigate } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env"; // Ensure you have your API key configured properly
import { fetchExercisesByUser } from "../services/ExerciseByUser";
import { useUserContext } from "../context/UserContext";

const AddExerciseScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true);
      try {
        const exerciseIds = await fetchExercisesByUser(user);
        const exercisesDetailsPromises = exerciseIds.map((id) =>
          axios.get(
            `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
            {
              headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              },
            }
          )
        );
        const exercisesResponses = await Promise.all(exercisesDetailsPromises);
        const exercisesDetails = exercisesResponses.map(
          (response) => response.data
        );
        setExercises(exercisesDetails);
        console.log("response", exercisesDetails);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExercises();
  }, []);

  const handleSelectExercise = (exercise) => {
    const exerciseData = {
      id: exercise.id,
      name: exercise.name,
      gifUrl: exercise.gifUrl,
    };

    const index = selectedExercises.findIndex(
      (ex) => ex.id === exerciseData.id
    );
    let newSelection = [...selectedExercises];

    if (index > -1) {
      newSelection.splice(index, 1); // Remove the exercise if it's already in the selection
    } else {
      newSelection.push(exerciseData); // Add the exercise if it's not in the selection
    }
    setSelectedExercises(newSelection);
  };

  const handleAddExercisesToSession = () => {
    const selectedExercisesArray = Array.from(selectedExercises);
    navigation.navigate("NewSessionScreen", {
      selectedExercises: selectedExercisesArray,
    });
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleSelectExercise(item)}
      >
        <Text style={styles.addButtonText}>
          {selectedExercises.find((ex) => ex.id === item.id) ? "Remove" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.exerciseId}
      />
      <Button
        title='Add Exercises to Session'
        onPress={handleAddExercisesToSession}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  exerciseCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  exerciseName: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddExerciseScreen;
