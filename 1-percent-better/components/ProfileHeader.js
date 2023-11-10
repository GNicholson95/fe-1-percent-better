import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchUsernameByUserId } from "../services/userService";

const ProfileHeader = () => {
  const [username, setUsername] = useState("Loading..."); // default state while loading

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await fetchUsernameByUserId();
        setUsername(fetchedUsername);
      } catch (error) {
        console.error("Error fetching username: ", error);
        setUsername("Error"); // Set username to "Error" or some other value to indicate failure
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://loremflickr.com/150/150" }} // Placeholder image
        style={styles.avatar}
      />
      <Text style={styles.username}>{`${username}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    // Remove the height: 150 if it's no longer necessary for layout
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileHeader;
