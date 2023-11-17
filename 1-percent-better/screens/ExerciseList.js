import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { API_KEY } from "@env";
import ExerciseCard from "../components/ExerciseCards";
import { SearchBar } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import Sort from "../components/Sort";
import { addExerciseToUser } from "../services/addExerciseToUser";
import { fetchExercisesByUser } from "../services/exerciseByUser";
import Toast from "react-native-root-toast";
import { secondaryColor } from "../components/ColorPalette";

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
  "Back",
  "Cardio",
  "chest",
  "Lower arms",
  "Lower legs",
  "Shoulders",
  "Upper arms",
  "Upper legs",
  "Waist",
];

const ExerciseList = ({ navigation }) => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserContext();

  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [userExercises, setUserExercises] = useState([]);

  useEffect(() => {
    if (user) {
      fetchExercisesByUser(user)
        .then((userExercisesData) => {
          setUserExercises(userExercisesData);
        })
        .catch((error) => {
          console.error("Error fetching user exercises:", error);
        });
    }
  }, [user]);

  const handleAddExercise = (exerciseData) => {
    const isAlreadyAdded = userExercises.some(
      (userExercise) => userExercise.externalExerciseId === exerciseData.exId
    );

    if (isAlreadyAdded) {
      Toast.show("Exercise is already in your list.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        j,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
      return;
    }

    addExerciseToUser(
      user,
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

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        params: { limit: "1200" },
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

  const updateSearch = (search) => {
    setSearch(search);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
      />
      <View style={styles.filterContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedBodyPart(value)}
          items={bodyParts.map((part) => ({ label: part, value: part }))}
          style={pickerSelectStyles}
          placeholder={{ label: "Body parts", value: null }}
        />
        <Sort value={sortingValue} onChange={setSortingValue} />
      </View>
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
    marginTop: 0,
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    backgroundColor: "white",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: secondaryColor,
    paddingTop: 15,
    marginTop: 25,
    paddingBottom: 10,
  },
  inputContainer: {
    backgroundColor: "white",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    borderBottomColor: secondaryColor,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "gray",
    color: "black",
    backgroundColor: "white",
    marginLeft: 60,
    borderRightWidth: 1,
    borderRightColor: secondaryColor,
    paddingRight: 60,
    fontWeight: "bold",
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "gray",
    color: "black",
    backgroundColor: "white",
    marginLeft: 60,
    borderRightWidth: 1,
    borderRightColor: "black",
    paddingRight: 60,
    fontWeight: "bold",
  },
});

export default ExerciseList;
