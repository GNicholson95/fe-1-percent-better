import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import ExerciseCard from "../components/ExerciseCards";

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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
        keyExtractor={(item) => String(item.id)}
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
