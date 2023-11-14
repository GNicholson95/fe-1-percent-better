import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TokenAuth, isLoggedIn } from "../services/LogIn";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-root-toast";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();

  const handleLogin = async () => {
    try {
      const token = await TokenAuth(username, password);
      const user = await isLoggedIn(token);
      await setUser(Number(user));
      Toast.show("Log in success!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      navigation.navigate("DynamicScreen");
    } catch (error) {
      Toast.show("Log in failed!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      console.error(error, "error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text style={styles.text}>Forgotten your password?</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f1",
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
    color: "#ff8a5c",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#ff8a5c",
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

export default LoginScreen;
