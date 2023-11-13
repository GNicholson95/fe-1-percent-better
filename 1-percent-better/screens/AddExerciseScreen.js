import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AddExerciseScreen = ({ route }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  useEffect(() => {
    if (route.params?.exercises) {
      setSelectedExercises(route.params.exercises);
    }
  }, [route.params?.exercises]);

  console.log("?????????",selectedExercises[0]);

  return (
    <View>
      <Text> AddExerciseScreen </Text>
    </View>
  );
};

export default AddExerciseScreen;