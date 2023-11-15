import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchUsernameByUserId } from "../services/userService";
import { useUserContext } from "../context/UserContext";

const ProfileHeader = () => {
  const [username, setUsername] = useState("Profile");
  const { user } = useUserContext();

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const fetchedUsername = await fetchUsernameByUserId(user);
          setUsername(fetchedUsername);
        } catch (error) {
          console.error("Error fetching username: ", error);
          setUsername("Error");
        }
      }
    };

    fetchUsername();
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/green_banner_1-percent-better_720.png")}
        style={styles.avatar}
        alt="logo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    height: 60,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileHeader;
