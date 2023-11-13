import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import UserContext from "../context/UserContext";
import axios from "axios";
import { API_KEY } from "@env";
import ExerciseCard from "../components/ExerciseCards";
import { SearchBar } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import Sort from "../components/Sort";
import { addExerciseToUser } from "../services/AddExerciseToUser";
import { fetchExercisesByUser } from "../services/ExerciseByUser";
import Toast from "react-native-root-toast";

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

const bodyParts = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

const ExerciseList = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);
  const [userExercises, setUserExercises] = useState([]);

  // Load user exercises on component mount
  useEffect(() => {
    fetchExercisesByUser(userId)
      .then((userExercisesData) => {
        setUserExercises(userExercisesData);
      })
      .catch((error) => {
        console.error("Error fetching user exercises:", error);
      });
  }, [userId]);

  // Add exercise to user's list
  const handleAddExercise = (exerciseData) => {
    const isAlreadyAdded = userExercises.some(
      (userExercise) => userExercise.externalExerciseId === exerciseData.exId
    );

    if (isAlreadyAdded) {
      Toast.show("Exercise is already in your list.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
      return;
    }

    addExerciseToUser(
      userId,
      exerciseData.exBodypart,
      exerciseData.exName,
      exerciseData.exId
    )
      .then((addedExercise) => {
        setUserExercises([...userExercises, addedExercise]);
        Toast.show("Exercise added to My Exercises", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      })
      .catch((error) => {
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
      });
  };
  const sortExercises = (exercisesList, sortValue) => {
    return [...exercisesList].sort((a, b) => {
      if (sortValue === "Name A-Z") {
        return a.name.localeCompare(b.name);
      } else if (sortValue === "Name Z-A") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  };
  // Fetch all exercises on component mount
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        params: { limit: "1300" },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      })
      .then((response) => {
        const allowedExercises = response.data.filter((exercise) =>
          allowedEquipment.includes(exercise.equipment.toLowerCase())
        );
        setExercises(allowedExercises);
        setFilteredExercises(allowedExercises);
      })
      .catch((error) => {
        console.error("There was an error fetching the exercises:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter and sort exercises based on selected criteria
  useEffect(() => {
    const bodyPartTerm = selectedBodyPart ? selectedBodyPart.toLowerCase() : "";
    const searchTerm = search.toLowerCase();
    let newFilteredExercises = exercises.filter((exercise) => {
      return (
        (bodyPartTerm
          ? exercise.bodyPart.toLowerCase() === bodyPartTerm
          : true) && exercise.name.toLowerCase().includes(searchTerm)
      );
    });

    newFilteredExercises = sortExercises(newFilteredExercises, sortingValue);
    setFilteredExercises(newFilteredExercises);
  }, [selectedBodyPart, search, sortingValue, exercises]);

  // Helper function to update search state
  const updateSearch = (search) => {
    setSearch(search);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search here...'
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
      />
      <RNPickerSelect
        onValueChange={(value) => setSelectedBodyPart(value)}
        items={bodyParts.map((part) => ({ label: part, value: part }))}
        style={pickerSelectStyles}
        placeholder={{ label: "Select a body part", value: null }}
      />
      <Sort
        value={sortingValue}
        onChange={setSortingValue}
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            navigation={navigation}
            onAddExercise={handleAddExercise}
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
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "lightgrey",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginTop: 10,
  },
});

export default ExerciseList;
