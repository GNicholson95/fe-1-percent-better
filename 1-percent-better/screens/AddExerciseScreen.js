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

const AddExerciseScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true);
      try {
        const exerciseIds = await fetchExercisesByUser();
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

  const handleSelectExercise = (exerciseId) => {
    const newSelection = new Set(selectedExercises);
    if (newSelection.has(exerciseId)) {
      newSelection.delete(exerciseId);
    } else {
      newSelection.add(exerciseId);
    }
    setSelectedExercises(newSelection);
  };

  const handleAddExercisesToSession = () => {
    navigation.navigate("NewSessionScreen", {
      selectedExercises: Array.from(selectedExercises),
    });
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleSelectExercise(item.id)} // Assuming 'id' is the correct property
      >
        <Text style={styles.addButtonText}>
          {selectedExercises.has(item.id) ? "Remove" : "Add"}
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
