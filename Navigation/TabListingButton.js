import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import color from "../config/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function TabListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={color.white}
          size={50}
        />
      </View>
    </TouchableOpacity>
  );
}

export default TabListingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: color.white,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
  },
});
