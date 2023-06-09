import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../config/color";

function AppButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: colors[props.color] }]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "yellow",
    marginVertical: 2,
  },
  text: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});
