import React from 'react';
import { StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Sort = ({ value, onChange }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => onChange(value)}
      items={[
        { label: "Name A-Z", value: "Name A-Z" },
        { label: "Name Z-A", value: "Name Z-A" },
      ]}
      value={value}
      style={styles.sortButton}
    />
  );
};

const styles = StyleSheet.create({
  sortButton:{
    backgroundColor: "#f1f1f1",
    fontSize: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color:'"#f1f1f1"'
  }
});


export default Sort;