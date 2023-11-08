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
    // <View style={styles.container}>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Use flex: 1 to make the cards take up an even part of the screen
//     flexDirection: "column", // Arrange cards horizontally (you can change this to column if needed)
//   },
// });

export default DynamicScreen;
