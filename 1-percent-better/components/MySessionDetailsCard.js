import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getDayOfWeek, formatDate, formatTime } from "../utils/DateTimeUtils";
import { accentColor, callToActionColor } from "./ColorPalette";
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
      <Text style={styles.title}>
        {exercise.externalExerciseName.toUpperCase()}
      </Text>
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
    backgroundColor: "#fff",
    padding: 15,
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
    color: accentColor,
    paddingBottom: 10,
  },
});
export default MySessionDetailsCard;
