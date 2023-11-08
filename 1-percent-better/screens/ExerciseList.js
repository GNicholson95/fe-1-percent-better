import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import ExerciseCard from "../components/ExerciseCards";
import Sort from "../components/Sort";

// Define the allowed equipment types in a list
const allowedEquipment = [
  "barbell",
  "cable",
  "dumbbell",
  "ez barbell",
  "kettlebell",
  "olympic barbell",
  "smith machine",
  "trap bar",
  "weighted",
];

const ExerciseList = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortingValue, setSortingValue] = useState('Name A-Z');

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      params: { limit: "1300" },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        const filteredExercises = response.data.filter((exercise) =>
          allowedEquipment.includes(exercise.equipment.toLowerCase())
        );
        setExercises(filteredExercises);
      })
      .catch((error) => {
        console.error("There was an error fetching the exercises:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const sortExercises = () => {
    const sortedExercises = [...exercises];
  
    if (sortingValue === 'Name A-Z') {
      sortedExercises.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortingValue === 'Name Z-A') {
      sortedExercises.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedExercises;
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Sort value={sortingValue} onChange={setSortingValue}/>
      <FlatList
        data={sortExercises()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} navigation={navigation} />
        )}
        style={styles.container} // Set the style for FlatList to handle scrolling
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default ExerciseList;
