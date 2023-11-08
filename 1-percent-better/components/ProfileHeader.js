import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import NavBar from "../Navigators/NavBar";

const ProfileHeader = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://loremflickr.com/150/150" }} // Placeholder image
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    height: 150,
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
