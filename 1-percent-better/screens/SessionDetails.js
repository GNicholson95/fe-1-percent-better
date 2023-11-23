import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MySessionDetailsCard from "../components/MySessionDetailsCard";
import { backgroundColor, primaryColor } from "../components/ColorPalette";

const SessionDetails = ({ route }) => {
  const { session } = route.params;

  return (
    <View style={styles.sessionDetailContainer}>
    <FlatList
      data={session.sessionlogExerciseSet.map((log) => log.exerciseId)}
      renderItem={({ item }) => <MySessionDetailsCard exercise={item} />}
      keyExtractor={(item, index) => String(index)}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  sessionDetailContainer:{
    flex:1,
    backgroundColor:primaryColor,
  }
})

export default SessionDetails;
