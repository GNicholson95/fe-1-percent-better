import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createUser } from "../services/createUser";
import { TokenAuth, isLoggedIn } from "../services/logIn";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-root-toast";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  callToActionColor,
} from "../components/ColorPalette";

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
      <View style={styles.formContainer}>
        <View>
          <Image
            source={require("../assets/green_banner_1-percent-better_720.png")}
            style={styles.avatar}
            alt="logo"
          />
        </View>
        <Text style={styles.text} nativeID="signUpEmailLabel">
          Email:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          accessibilityLabel="input"
          accessibilityLabelledBy="signupEmailLabel"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text} nativeID="signupUsernameLabel">
          Create your username:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          accessibilityLabel="input"
          accessibilityLabelledBy="signupUsernameLabel"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <Text style={styles.text} nativeID="signupPasswordLabel">
          Create your password:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          accessibilityLabel="input"
          accessibilityLabelledBy="signupPasswordLabel"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Create Account"
          accessibilityRole="button"
          style={styles.loginButton}
          onPress={handleSignup}
        >
          <Text style={styles.loginButtonText}>Sign up</Text>
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
  avatar: {
    resizeMode: "contain",
    height: 60,
    width: "100%",
    alignSelf: "center",
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
