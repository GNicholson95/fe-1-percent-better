import React, { useState } from "react";
import { View } from "react-native";
import AllExercisesCard from "../components/AllExercisesCard";
import MySessions from "../components/MySessions";
import ExerciseList from "./ExerciseList"; // Assuming this is the correct path

const DynamicScreen = ({ navigation }) => {
  const [showExerciseList, setShowExerciseList] = useState(false);

  const handleShowExerciseList = () => {
    setShowExerciseList(true);
  };

  return (
    <View>
      {showExerciseList ? (
        <ExerciseList navigation={navigation} />
      ) : (
        <>
          <AllExercisesCard onCardPress={handleShowExerciseList} />
          <MySessions />
        </>
      )}
    </View>
  );
};

export default DynamicScreen;
