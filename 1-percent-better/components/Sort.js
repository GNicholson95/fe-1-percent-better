import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
const Sort = ({ value, onChange }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => onChange(value)}
      items={[
        { label: "Name A-Z", value: "Name A-Z" },
        { label: "Name Z-A", value: "Name Z-A" },
      ]}
      value={value}
      style={pickerSelectStyles}
      placeholder={{ label: "Sort by", value: null }}
    />
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    // borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    marginRight: 60,
    paddingLeft: 40,
    fontWeight: "bold",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    backgroundColor: "white",
    marginTop: 10,
  },
});
export default Sort;
