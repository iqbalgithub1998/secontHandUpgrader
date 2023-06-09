import React from "react";
import { View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";

function AppIcon({ name, backgroundColor }) {
  return (
    <View style={[styles.logo, { backgroundColor: colors[backgroundColor] }]}>
      <MaterialCommunityIcons
        style={{ color: colors.white }}
        size={25}
        name={name}
      />
    </View>
  );
}

export default AppIcon;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
