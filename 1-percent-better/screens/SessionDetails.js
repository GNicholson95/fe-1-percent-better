import React from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import MySessionDetailsCard from "../components/MySessionDetailsCard";

const SessionDetails = ({ route }) => {
  const { session } = route.params;

  return (
    <FlatList
      data={session.sessionlogExerciseSet.map((log) => log.exerciseId)} // Flatten the array here
      renderItem={({ item }) => <MySessionDetailsCard exercise={item} />} // Pass each exercise to the card
      keyExtractor={(item, index) => String(index)}
    />
  );
};

export default SessionDetails;
