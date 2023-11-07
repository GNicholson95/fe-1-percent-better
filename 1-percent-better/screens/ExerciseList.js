import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import ExerciseCard from "../components/ExerciseCards";

// Define the allowed equipment types in a list
// const allowedEquipment = [
//   "barbell",
//   "cable",
//   "dumbbell",
//   "ez barbell",
//   "kettlebell",
//   "olympic barbell",
//   "smith machine",
//   "trap bar",
//   "weighted",
// ];

// const handleAddExercise = (exercise) => {
//   setMyExercises((currentExercises) => {
//     // Prevent adding duplicates
//     if (currentExercises.some((e) => e.id === exercise.id)) {
//       alert("This exercise is already in your list!");
//       return currentExercises;
//     }
//     return [...currentExercises, exercise];
//   });
// };

console.log(API_KEY);

const ExerciseList = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  //const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      params: { limit: "10" },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the exercises:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => String(item.id)} // Use the actual id from the exercise data
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default ExerciseList;
