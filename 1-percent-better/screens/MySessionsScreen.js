import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchSessionByUserId } from "../services/userService";
import deleteSession from "../services/deleteSession";
import {
  getDayOfWeek,
  formatDate,
  formatTime,
} from "../components/DateTimeUtils";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import { Button } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";

export default function MySessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const navigation = useNavigation();
  const { user } = useUserContext();
  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (user) {
          const fetchedSessions = await fetchSessionByUserId(user);
          setSessions(fetchedSessions);
        }
      } catch (error) {
        console.error("Error loading users:", error.response.data);
      }
    };
    loadUsers();
  }, [user]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${getDayOfWeek(date)} ${formatDate(
      date
    )} ${formatTime(date)}`;
    return formattedDate;
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      Alert.alert("Success", "Session deleted successfully");
      setSessions(
        sessions.filter((session) => session.sessionId !== sessionId)
      );
    } catch (error) {
      console.error("Error deleting session:", error);
      Alert.alert("Error", "Failed to delete session");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SessionDetails", { session: item })}
      >
        <Text style={styles.sessionInfo}>{item.sessionName}</Text>
        <Text style={styles.sessionInfo}>{formatDateTime(item.dateTime)}</Text>
      </TouchableOpacity>
    </View>
  );

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
        title="Create New Session"
        onPress={() => navigation.navigate("NewSessionScreen")}
        color={callToActionColor}
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
    backgroundColor: backgroundColor, // Set a background color for the container
  },
  flatList: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  deleteButton: {
    marginLeft: 90,
    borderRadius: 50,
  },
});
