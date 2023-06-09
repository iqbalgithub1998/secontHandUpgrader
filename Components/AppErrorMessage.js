import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../config/color";
function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.text}>{error}</Text>;
}

export default AppErrorMessage;

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
    marginStart: 10,
  },
});
