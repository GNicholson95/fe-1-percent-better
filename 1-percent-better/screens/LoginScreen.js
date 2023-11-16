import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
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
import ProfileHeader from "../components/ProfileHeader";

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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View>
          <Image
            source={require("../assets/green_banner_1-percent-better_720.png")}
            style={styles.avatar}
            alt="logo"
          />
        </View>
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

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Login"
          accessibilityRole="button"
          accessibilityHint="Login to your account"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: backgroundColor,
  },
  avatar: {
    resizeMode: "contain",
    height: 60,
    width: "100%",
    alignSelf: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
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
    color: callToActionColor,
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
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
