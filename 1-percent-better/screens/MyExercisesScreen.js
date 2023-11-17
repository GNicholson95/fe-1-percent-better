import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { fetchIdsExercisesByUser } from "../services/exerciseByUser";
import ExerciseCard from "../components/ExerciseCards";
import { SearchBar } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import Sort from "../components/Sort";
import { useUserContext } from "../context/UserContext";
import { secondaryColor } from "../components/ColorPalette";

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

const MyExercisesScreen = ({ navigation }) => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserContext();

  const [userExercises, setUserExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Looks quiet here... Add exercises to your list on the All exercises
          section.
        </Text>
      </View>
    );
  };

  const fetchUserExercisesDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user) {
        const uniqueExerciseIds = await fetchIdsExercisesByUser(user);
        const exercisesDetails = await Promise.all(
          uniqueExerciseIds.map(async (uniqueExercise) => {
            const response = await axios.get(
              `https://exercisedb.p.rapidapi.com/exercises/exercise/${uniqueExercise.externalExerciseId}`,
              {
                headers: {
                  "X-RapidAPI-Key": API_KEY,
                  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                },
              }
            );
            return { ...response.data, exerciseId: uniqueExercise.exerciseId };
          })
        );

        setUserExercises(exercisesDetails);
        setFilteredExercises(exercisesDetails);
      }
    } catch (error) {
      console.error(
        "There was an error fetching the user's exercise details:",
        error
      );
      setError("Failed to load exercises. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserExercisesDetails();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      fetchUserExercisesDetails
    );
    return unsubscribe;
  }, [navigation, fetchUserExercisesDetails]);

  const sortExercises = (exercises, sortValue) => {
    return [...exercises].sort((a, b) => {
      if (sortValue === "Name A-Z") {
        return a.name.localeCompare(b.name);
      } else if (sortValue === "Name Z-A") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  };

  useEffect(() => {
    let updatedFilteredExercises = userExercises;

    if (selectedBodyPart) {
      updatedFilteredExercises = updatedFilteredExercises.filter(
        (exercise) =>
          exercise.bodyPart.toLowerCase() === selectedBodyPart.toLowerCase()
      );
    }

    if (search) {
      updatedFilteredExercises = updatedFilteredExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortingValue) {
      updatedFilteredExercises = sortExercises(
        updatedFilteredExercises,
        sortingValue
      );
    }

    setFilteredExercises(updatedFilteredExercises);
  }, [selectedBodyPart, search, sortingValue, userExercises, user]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading exercises...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
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
            buttonText="Add to Session"
          />
        )}
        keyExtractor={(item) => item.exerciseId}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    color: "Red",
  },
  emptyText: {
    fontSize: 18,
    color: "red",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyExercisesScreen;
