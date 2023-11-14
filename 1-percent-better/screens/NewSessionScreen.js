import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import {
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
import { createSession } from "../services/createSession"; // Import the createSession function
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editingField, setEditingField] = useState("");
  const navigation = useNavigation();

  const [sessionId, setSessionId] = useState(null);
  const [exercise, setExercise] = useState([]);

  const exerciseArray = route.params?.selectedExercises;
  console.log(exerciseArray);
  useEffect(() => {
    if (route.params?.selectedExercises) {
      setSelectedExercises(route.params.selectedExercises);
    }
  }, [route.params?.selectedExercises]);
  const handleSaveSession = async () => {
    try {
      const newSession = await createSession(userId, sessionName);

      setSessionId(newSession.sessionId); // Update the state with the new session ID
      Alert.alert("Success", `Session ${newSession.sessionName} created`);
    } catch (error) {
      console.log("this is the catch -->", error);
      console.log(error.data);
      Alert.alert("Error", "Failed to create session");
    }
  };

  const exerciseList = [
    { id: 1, name: "Push-ups" },
    { id: 2, name: "Squats" },
    { id: 3, name: "Bench Press" },
    { id: 4, name: "Deadlifts" },
    { id: 5, name: "Planks" },
    { id: 6, name: "Lunges" },
    { id: 7, name: "Pull-ups" },
    { id: 8, name: "Curls" },
    { id: 9, name: "Sit-ups" },
    { id: 10, name: "Shoulder Press" },
  ];

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
      <Text style={styles.subtitle}>Date: 12/11/23</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddExerciseScreen")}
        >
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Completed Exercises:</Text>
        <FlatList
          data={exerciseList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
        {/* <FlatList
          data={selectedExercises}
          renderItem={({ item }) => (
            <Text style={styles.infoText}>{item.name}</Text>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        /> */}
      </View>
      <View style={styles.exerciseDetailContainer}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.detailContainer}>
          <Text>Sets:</Text>
          <Text>{exercise.sets}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <Text>Reps: {exercise.reps}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit("reps")}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* Weight Container */}
        <View style={styles.detailContainer}>
          <Text>Weight: {exercise.weight}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit("weight")}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={editModalVisible}
          animationType='slide'
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Edit {editingField}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEditedValue}
                value={editedValue}
                keyboardType='numeric'
              />
              <Button
                title='Save'
                onPress={handleSaveEdit}
              />
              <Button
                title='Cancel'
                onPress={() => setEditModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
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
  infoContainer: {
    height: 120,
    width: 400,
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  flatList: {
    width: "100%",
    textAlign: "center",
  },
  exerciseDetailContainer: {
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  editButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  saveButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: "auto", // Align to the right
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
export default NewSessionScreen;
