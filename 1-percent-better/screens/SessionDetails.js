import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MySessionDetailsCard from "../components/MySessionDetailsCard";

const SessionDetails = ({ route }) => {
  const { session } = route.params;

  return (
    <ScrollView style={styles.container}>
      <MySessionDetailsCard session={session} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});

export default SessionDetails;
