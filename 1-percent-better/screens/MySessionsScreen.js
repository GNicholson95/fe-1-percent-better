import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchSessionByUserId } from "../services/userService";
import {
  getDayOfWeek,
  formatDate,
  formatTime,
} from "../components/DateTimeUtils";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import { Button } from "@rneui/themed";

export default function MySessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedSessions = await fetchSessionByUserId();
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    loadUsers();
  }, []);
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${getDayOfWeek(date)} ${formatDate(
      date
    )} ${formatTime(date)}`;
    return formattedDate;
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("SessionDetails", { session: item })}
    >
      <Text style={styles.sessionInfo}>{item.sessionName}</Text>
      <Text style={styles.sessionInfo}>{formatDateTime(item.dateTime)}</Text>
    </TouchableOpacity>
  );
console.log(sessions.sessionlogExerciseSet);
  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <Button
        style={styles.NewSessionButton}
        title='Create New Session'
        onPress={() => navigation.navigate("NewSessionScreen")}
        color='#4CAf50'
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F2F2F2", // Set a background color for the container
  },
  flatList: {
    width: "100%",
  },
  card: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff", // Set the card background color
    borderRadius: 10, // Set border radius for rounded corners
    shadowColor: "#000", // Set shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Set shadow opacity
    shadowRadius: 3.84, // Set shadow radius
    elevation: 5, // Set elevation for Android devices
    justifyContent: "center",
    alignItems: "center",
  },
  sessionInfo: {
    fontSize: 16,
  },
});
