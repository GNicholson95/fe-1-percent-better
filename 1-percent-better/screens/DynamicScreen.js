import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, StatusBa, Text } from "react-native";
import AllExercisesCard from "../components/AllExercisesCard";
import MySessions from "../components/MySessions";

const DynamicScreen = () => {
  return (
    // <View style={styles.container}>
    <View>
      <AllExercisesCard />
      <MySessions />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Use flex: 1 to make the cards take up an even part of the screen
//     flexDirection: "column", // Arrange cards horizontally (you can change this to column if needed)
//   },
// });

export default DynamicScreen;
