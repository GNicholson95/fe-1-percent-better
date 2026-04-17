import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { TokenAuth, isLoggedIn } from "../services/logIn";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-root-toast";
import {
  secondaryColor,
  primaryColor,
  accentColor,
} from "../components/ColorPalette";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUserContext();

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

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
      navigation.reset({
        index: 0,
        routes: [{ name: "Back", params: { screen: "DynamicScreen" } }],
      });
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.message ||
        "Login failed. The API may be waking up, so try again in a moment.";
      console.error("Login failed:", error?.response?.data || error);
      setErrorMessage(message);
      Toast.show("Log in failed!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View>
          <Image
            source={require("../assets/black-banner-1percent.png")}
            style={styles.avatar}
            alt="logo"
          />
        </View>
        <View>
          <Text style={styles.text} nativeID="usernameLabel">
            Username:
          </Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="input"
            accessibilityLabelledBy="usernameLabel"
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View>
          <Text style={styles.text} nativeID="passwordLabel">
            Password:
          </Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="input"
            accessibilityLabelledBy="passwordLabel"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Login"
          accessibilityRole="button"
          accessibilityHint="Login to your account"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: primaryColor,
  },
  avatar: {
    resizeMode: "contain",
    height: 60,
    width: "100%",
    alignSelf: "center",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingBottom: 15,
    paddingHorizontal: 15,
    marginVertical: 150,
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
    marginBottom: 10,
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
    backgroundColor: accentColor,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
