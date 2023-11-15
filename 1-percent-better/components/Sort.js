import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { accentColor } from "./ColorPallette";
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
    />
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginTop: 10,
    value:accentColor,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginTop: 10,
  },
});
export default Sort;
