import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

function SafeScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

export default SafeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});
