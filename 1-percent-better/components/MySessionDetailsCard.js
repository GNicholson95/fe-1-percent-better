import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  getDayOfWeek,
  formatDate,
  formatTime,
} from "../components/DateTimeUtils";
const MySessionDetailsCard = ({ exercise }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${getDayOfWeek(date)} ${formatDate(
      date
    )} ${formatTime(date)}`;
    return formattedDate;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise.externalExerciseName}</Text>
      {/* Make sure to check if workoutlogSet and its first index are defined */}
      <Text>Reps: {exercise.workoutlogSet?.[0]?.reps}</Text>
      <Text>Sets: {exercise.workoutlogSet?.[0]?.sets}</Text>
      <Text>Weight Kg: {exercise.workoutlogSet?.[0]?.weightKg}</Text>
      <Text>Personal Best: {exercise.personalBest}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8A5C",
    marginTop: 20,
  },
});
export default MySessionDetailsCard;
