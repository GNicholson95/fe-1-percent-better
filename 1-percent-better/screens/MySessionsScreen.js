import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { fetchSessionByUserId } from "../services/userService";
import deleteSession from "../services/deleteSession";
import { getDayOfWeek, formatDate, formatTime } from "../utils/DateTimeUtils";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";
import ProfileHeader from "../components/ProfileHeader";
import { backgroundColor, callToActionColor } from "../components/ColorPalette";

export default function MySessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const navigation = useNavigation();
  const { user } = useUserContext();

  const loadSessions = async () => {
    try {
      if (user) {
        const fetchedSessions = await fetchSessionByUserId(user);
        setSessions(fetchedSessions);
      }
    } catch (error) {
      console.error("Error loading sessions:", error.response?.data || error);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadSessions);
    return unsubscribe;
  }, [navigation, loadSessions]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${getDayOfWeek(date)} ${formatDate(date)} ${formatTime(date)}`;
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
        accessible={true}
        accessibilityLabel="Session Details"
        accessibilityHint="Navigate to Session Details page"
        onPress={() =>
          navigation.navigate("Session Details", { session: item })
        }
      >
        <Text style={styles.sessionInfo}>{item.sessionName.toUpperCase()}</Text>
        <Text style={styles.sessionDate}>{formatDateTime(item.dateTime)}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ProfileHeader />
      <View style={styles.container}>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Create Session"
          accessibilityRole="button"
          accessibilityHint="Navigate to New Session Page"
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
    paddingTop: 20,
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
  NewSessionButton: {
    backgroundColor: callToActionColor,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  createSessionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
