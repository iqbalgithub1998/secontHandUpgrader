import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/color";

function LikeButton({ show, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {show && show === -1 ? (
        <MaterialCommunityIcons
          name="heart-outline"
          size={30}
          style={styles.icon}
        />
      ) : (
        <MaterialCommunityIcons name="heart" size={30} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
}

export default LikeButton;

const styles = StyleSheet.create({
  container: {},
  icon: {
    color: colors.primary,
  },
});
