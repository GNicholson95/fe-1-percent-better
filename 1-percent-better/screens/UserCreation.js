import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createUser } from "../services/CreateUser";
import { TokenAuth, isLoggedIn } from "../services/LogIn";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-root-toast";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPallette";

const UserCreation = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUser } = useUserContext();

  const handleSignup = async () => {
    try {
      const newUser = await createUser(username, password, email);
      const token = await TokenAuth(username, password);
      const user = await isLoggedIn(token);
      await setUser(Number(user));
      Toast.show("Account Created", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      navigation.navigate("DynamicScreen");
    } catch (error) {
      Toast.show("Account creation failed!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.text}>Create your username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Text style={styles.text}>Create your password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColor,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: secondaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: callToActionColor,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UserCreation;
