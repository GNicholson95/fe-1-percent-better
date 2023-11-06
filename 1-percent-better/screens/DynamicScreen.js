import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, StatusBa, Text } from "react-native";
import AllExercisesCard from "../components/AllExercisesCard";
import MySessions from "../components/MySessions";

const DynamicScreen = () => {
  return (
    <View>
      <AllExercisesCard />
      <MySessions />
    </View>
  );
};

export default DynamicScreen;
