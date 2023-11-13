import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MySessionDetailsCard = ({ session }) => {
const exerciseDetails = session.sessionlogExerciseSet[0].exerciseId;
console.log(exerciseDetails);
  return (
    <View style={styles.card}>
      {/* <Text style={styles.title}>{session.sessionlogExerciseSet}</Text> */}
      <Text style={styles.title}>{session.sessionName}</Text>
      <Text>{exerciseDetails.externalExerciseName}</Text>
      <Text>Reps: {exerciseDetails.workoutlogSet[0].reps}</Text>
      <Text>Sets: {exerciseDetails.workoutlogSet[0].sets}</Text>
      <Text>Weight Kg: {exerciseDetails.workoutlogSet[0].weightKg}</Text>
      <Text>personal Best:{exerciseDetails.personalBest}</Text>
      {/* <Text style={styles.title}>{}</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8a5c",
    marginTop: 20,
  },
});

export default MySessionDetailsCard;