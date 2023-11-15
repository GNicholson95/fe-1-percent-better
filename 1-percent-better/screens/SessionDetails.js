import React from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import MySessionDetailsCard from "../components/MySessionDetailsCard";

const SessionDetails = ({ route }) => {
  const { session } = route.params;

  return (
    <FlatList
      data={session.sessionlogExerciseSet.map((log) => log.exerciseId)}
      renderItem={({ item }) => <MySessionDetailsCard exercise={item} />}
      keyExtractor={(item, index) => String(index)}
    />
  );
};

export default SessionDetails;
