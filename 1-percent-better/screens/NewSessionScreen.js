import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
const NewSessionScreen = () => {
  const exercise = {
    id: 1,
    name: "Push-ups",
    sets: 3,
    reps: 10,
    weight: "Bodyweight",
  };
  const exerciseList = [
    { id: 1, name: "Push-ups" },
    { id: 2, name: "Squats" },
    { id: 3, name: "Bench Press" },
    { id: 4, name: "Deadlifts" },
    { id: 5, name: "Planks" },
    { id: 6, name: "Lunges" },
    { id: 7, name: "Pull-ups" },
    { id: 8, name: "Curls" },
    { id: 9, name: "Sit-ups" },
    { id: 10, name: "Shoulder Press" },
  ];
  const renderItem = ({ item }) => (
    <Text style={styles.infoText}>{item.name}</Text>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Name</Text>
      <Text style={styles.subtitle}>Date: 12/11/23</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Completed Exercises:</Text>
        <FlatList
          data={exerciseList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
      </View>
      <View style={styles.exerciseDetailContainer}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.detailContainer}>
          <Text>Sets:</Text>
          <Text>{exercise.sets}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <Text>Reps:</Text>
          <Text>{exercise.reps}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <Text>Weight:</Text>
          <Text>{exercise.weight}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "left",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  infoContainer: {
    height: 120,
    width: 400,
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  flatList: {
    width: "100%",
    textAlign: "center",
  },
  exerciseDetailContainer: {
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  editButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
});
export default NewSessionScreen;
