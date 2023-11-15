import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    height: 150,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8a5c",
    marginTop: 20,
  },
});

export default Home;
