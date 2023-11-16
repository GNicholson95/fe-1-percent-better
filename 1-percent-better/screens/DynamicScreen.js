import React from "react";
import { View, Text } from "react-native";
import AllExercisesCard from "../components/AllExercisesCard";
import MySessionsCard from "../components/MySessionsCard";
import MyExercisesCard from "../components/MyExercicesCard";
const DynamicScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <AllExercisesCard onPress={() => navigation.navigate("ExerciseList")} />
      <MyExercisesCard
        onPress={() => navigation.navigate("MyExercisesScreen")}
      />
      <MySessionsCard onPress={() => navigation.navigate("MySessionsScreen")} />
    </View>
  );
};

export default DynamicScreen;
