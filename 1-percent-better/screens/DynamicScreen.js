import React from "react";
import { View } from "react-native";
import AllExercisesCard from "../components/AllExercisesCard";
import MySessionsCard from "../components/MySessionsCard";
import MyExercisesCard from "../components/MyExercicesCard";

const DynamicScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <AllExercisesCard onPress={() => navigation.navigate("ExerciseList")} />
      <MyExercisesCard onPress={() => navigation.navigate("MyExercises")} />
      <MySessionsCard onPress={() => navigation.navigate("MySessions")} />
    </View>
  );
};

export default DynamicScreen;
