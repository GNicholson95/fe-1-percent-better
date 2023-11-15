import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { fetchSessionByUserId } from "../services/userService";
import deleteSession from "../services/deleteSession";
import {
  getDayOfWeek,
  formatDate,
  formatTime,
} from "../components/DateTimeUtils";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
// import { Button } from "@rneui/themed";
import { useUserContext } from "../context/UserContext";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";
import ProfileHeader from "../components/ProfileHeader";

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
        onPress={() => navigation.navigate("Session Details", { session: item })}
      >
        <Text style={styles.sessionInfo}>{item.sessionName.toUpperCase()}</Text>
        <Text style={styles.sessionDate}>{formatDateTime(item.dateTime)}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
    <ProfileHeader/>
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <TouchableOpacity
        style={styles.NewSessionButton}
        onPress={() => navigation.navigate("NewSessionScreen")}
      >
        <Text style={styles.createSessionButtonText}>Create New Session</Text>
      </TouchableOpacity>

    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: backgroundColor, 
    paddingTop:20,
  },
  flatList: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    justifyContent: "center",
    alignItems: "center",
  },
  sessionInfo: {
    color: callToActionColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  NewSessionButton:{
    backgroundColor: callToActionColor,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal:12,
    alignItems: "center",
    marginBottom:10,
    marginTop:10,
  },
  createSessionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
