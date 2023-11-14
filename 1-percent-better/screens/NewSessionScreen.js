import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  Modal,
  Button,
  ScrollView,
} from "react-native";

import { createSession } from "../services/createSession";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";
import { useNavigation } from "@react-navigation/native";

const NewSessionScreen = ({ route }) => {
  const { userId } = useContext(UserContext);
  const [sessionName, setSessionName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigation = useNavigation();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (route.params?.selectedExercises) {
      const exercisesWithDetails = route.params.selectedExercises.map(
        (exercise) => ({
          ...exercise,
          sets: "",
          reps: "",
          weight: "",
        })
      );
      setSelectedExercises(exercisesWithDetails);
    }
  }, [route.params?.selectedExercises]);
  const handleSaveSession = async () => {
    try {
      const newSession = await createSession(userId, sessionName);

      setSessionId(newSession.sessionId);
      Alert.alert("Success", `Session ${newSession.sessionName} created`);
    } catch (error) {
      console.log("this is the catch -->", error);
      console.log(error.data);
      Alert.alert("Error", "Failed to create session");
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setEditedValue(`${exercise[field]}`); // Set initial value to current value
    setEditModalVisible(true);
  };
  const handleSaveEdit = () => {
    // Update the corresponding value in the state
    setExercise({ ...exercise, [editingField]: editedValue });
    setEditModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Text style={styles.infoText}>{item.name}</Text>
  );

  const handleExerciseDetailChange = (id, field, value) => {
    const updatedExercises = selectedExercises.map((exercise) => {
      if (exercise.id === id) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setSelectedExercises(updatedExercises);
  };

  const handleSaveExercise = (exercise) => {
    // Implement logic to save exercise details to the session
    console.log("Saving exercise:", exercise);
    // Here you can call an API to save the exercise data
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Image
        source={{ uri: item.gifUrl }}
        style={styles.exerciseImage}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "sets", value)
        }
        value={item.sets}
        placeholder='Sets'
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "reps", value)
        }
        value={item.reps}
        placeholder='Reps'
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "weight", value)
        }
        value={item.weight}
        placeholder='Weight'
        keyboardType='numeric'
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => handleSaveExercise(item)}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sessionInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Session Name'
          value={sessionName}
          onChangeText={setSessionName}
        />
        <Button
          title='Save Session'
          onPress={handleSaveSession}
          color='#4CAF50'
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddExerciseScreen")}
        >
          <Text style={styles.button}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={selectedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "left",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  sessionInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },

  exerciseImage: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    resizeMode: "contain", // Or 'cover'
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  exerciseContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10, // Spacing between name and image
  },
  exerciseImage: {
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    resizeMode: "cover", // Or 'contain'
    borderRadius: 5, // Optional: if you want rounded corners for the image
    alignSelf: "center", // Center the image
    marginBottom: 10, // Spacing between image and inputs
  },
  exerciseImage: {
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    resizeMode: "cover", // Or 'contain'
    borderRadius: 5, // Optional: if you want rounded corners for the image
  },
  input: {
    flex: 1, // Ensures inputs take equal space
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5, // Adds vertical spacing
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-start", // Aligns button to the start of the flex container
    marginTop: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default NewSessionScreen;
