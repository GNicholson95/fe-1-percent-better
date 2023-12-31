import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";

import { createSession } from "../services/createSession";
import {
  backgroundColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPalette";
import { useNavigation } from "@react-navigation/native";
import { logWorkout } from "../services/logWorkout";
import deleteSession from "../services/deleteSession";
import deleteSessionExercise from "../services/deleteSessionExercise";
import { updateExercise } from "../services/patchPB";
import ProfileHeader from "../components/ProfileHeader";

const NewSessionScreen = ({ route }) => {
  const { user } = useUserContext();
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
    if (!sessionName) {
      Alert.alert("Error", "Please enter a session name.");
      return;
    }
    try {
      const newSession = await createSession(user, sessionName);
      setSessionId(newSession.sessionId);
      Alert.alert("Success", `Session ${newSession.sessionName} created`);

      navigation.navigate("Add Exercise To Session", {
        sessionId: newSession.sessionId,
      });
    } catch (error) {
      console.error("Error creating session:", error);
      Alert.alert("Error", "Failed to create session");
    }
  };

  const handleExerciseDetailChange = (id, field, value) => {
    const updatedExercises = selectedExercises.map((exercise) => {
      if (exercise.id === id) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setSelectedExercises(updatedExercises);
  };

  const handleSaveExercise = async (exercise) => {
    if (!sessionId) {
      Alert.alert(
        "Error",
        "Session ID is not available. Please save the session first."
      );
      return;
    }

    try {
      const updatedExercises = selectedExercises.map((ex) => {
        if (ex.sessionExerciseId === exercise.sessionExerciseId) {
          return {
            ...ex,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
          };
        }
        return ex;
      });
      setSelectedExercises(updatedExercises);

      // Log the workout
      const loggedWorkout = await logWorkout(exercise);
      Alert.alert(
        "Success",
        `Workout for ${exercise.name} logged successfully.`
      );
    } catch (error) {
      console.error("Error logging workout:", error);
      Alert.alert("Error", "Failed to log workout");
    }
  };

  const handleFinishSession = async () => {
    try {
      for (const exercise of selectedExercises) {
        await logWorkout(exercise);
        await updateExercise(exercise.internalId, exercise.weight);

        navigation.navigate("Back");
      }
      Alert.alert("Success", "Session workouts logged successfully.");
    } catch (error) {
      console.error("Error finishing session:", error);
      Alert.alert("Error", "Failed to log one or more workouts");
    }
  };

  const handleCancelSession = async () => {
    if (sessionId) {
      try {
        await deleteSession(sessionId);
        Alert.alert(
          "Session Cancelled",
          "The session has been successfully cancelled."
        );
      } catch (error) {
        console.error("Error cancelling session:", error);
        Alert.alert("Error", "Failed to cancel the session");
      }
    }
    navigation.navigate("Back");
  };

  const handleDeleteExercise = async (sessionExerciseId) => {
    try {
      await deleteSessionExercise(sessionExerciseId);
      Alert.alert(
        "Exercise Removed",
        "The exercise has been successfully removed from the session."
      );

      setSelectedExercises(
        selectedExercises.filter(
          (exercise) => exercise.id !== sessionExerciseId
        )
      );
    } catch (error) {
      console.error("Error deleting exercise from session:", error);
      Alert.alert("Error", "Failed to remove exercise from session");
    }
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Image source={{ uri: item.gifUrl }} style={styles.exerciseImage} />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "sets", value)
        }
        value={item.sets}
        placeholder="Sets"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "reps", value)
        }
        value={item.reps}
        placeholder="Reps"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          handleExerciseDetailChange(item.id, "weight", value)
        }
        value={item.weight}
        placeholder="Weight"
        keyboardType="numeric"
      />
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Save workout"
        style={styles.saveButton}
        onPress={() => handleSaveExercise({ ...item })}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ProfileHeader />
      <View style={styles.container}>
        <View style={styles.sessionInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Session Name"
            value={sessionName}
            onChangeText={setSessionName}
          />
          <TouchableOpacity
            style={styles.saveSessionButton}
            onPress={handleSaveSession}
          >
            <Text style={styles.saveSessionButtonText}>Save Session</Text>
          </TouchableOpacity>
        </View>
        {!sessionName ? null : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (sessionId) {
                  navigation.navigate("Add Exercise To Session", {
                    sessionId: sessionId,
                  });
                } else {
                  Alert.alert("Error", "Please create a session first.");
                }
              }}
            >
              <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={selectedExercises}
          renderItem={renderExercise}
          keyExtractor={(item) => item.internalId}
          style={styles.exerciseList}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleFinishSession}
          >
            <Text style={styles.saveButtonText}>Finish Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leaveSessionButton}
            onPress={handleCancelSession}
          >
            <Text style={styles.leaveSessionButtonText}>Cancel Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent: "center",
    backgroundColor: backgroundColor,
  },
  exerciseList: {
    backgroundColor: backgroundColor,
    width: "100%",
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
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: callToActionColor,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
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
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  saveSessionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: callToActionColor,
  },

  exerciseImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
    marginBottom: 10,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: callToActionColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-start",
    width: 160,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  leaveSessionButton: {
    backgroundColor: accentColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-start",
    width: 160,
  },
  leaveSessionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default NewSessionScreen;
