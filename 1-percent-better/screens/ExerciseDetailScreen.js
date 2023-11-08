import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.title}>{exercise.name.toUpperCase()}</Text>

      <View style={[styles.labelContainer, styles.bodyPart]}>
        <Text style={styles.label}>Body Part</Text>
        <Text style={styles.value}>{exercise.bodyPart}</Text>
      </View>
      <View style={[styles.labelContainer, styles.equipment]}>
        <Text style={styles.label}>Equipment</Text>
        <Text style={styles.value}>{exercise.equipment}</Text>
      </View>
      <View style={[styles.labelContainer, styles.target]}>
        <Text style={styles.label}>Target</Text>
        <Text style={styles.value}>{exercise.target}</Text>
      </View>
      <View style={[styles.labelContainer, styles.secondaryMuscles]}>
        <Text style={styles.label}>Secondary Muscles</Text>
        <Text style={styles.value}>{exercise.secondaryMuscles.join(", ")}</Text>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.subtitle}>Instructions:</Text>
        {exercise.instructions.map((instruction, index) => (
          <Text
            key={index}
            style={styles.instruction}
          >{`${index + 1}. ${instruction}`}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 300,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  labelContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyPart: {
    backgroundColor: "#e2f9e1",
  },
  equipment: {
    backgroundColor: "#e8eaf6",
  },
  target: {
    backgroundColor: "#ffe0b2",
  },
  secondaryMuscles: {
    backgroundColor: "#ffcdd2",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  instruction: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 30,
  },
  instructionsContainer: {
    paddingBottom: 50,
  },
});

export default ExerciseDetailScreen;