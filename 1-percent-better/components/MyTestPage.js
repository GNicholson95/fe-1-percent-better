import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchAllUsers } from "../services/userService";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <View>
      {users.map((user, index) => (
        <Text key={index}>{user.username}</Text>
      ))}
    </View>
  );
};

export default UsersComponent;
