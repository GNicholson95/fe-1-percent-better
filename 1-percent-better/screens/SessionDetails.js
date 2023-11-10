import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MySessionDetailsCard from "../components/MySessionDetailsCard";

const SessionDetails = ({ route }) => {
  const { exercise } = route.params;


          {/* <FlatList
        data={}
        renderItem={({ item }) => (
          <MySessionDetailsCard
            exercise={item}
            navigation={navigation}
            />
            )}
        keyExtractor={(item) => String(item.id)}
      /> */}

  return (
    <ScrollView style={styles.container}>
      <MySessionDetailsCard exercise={exercise} />
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
