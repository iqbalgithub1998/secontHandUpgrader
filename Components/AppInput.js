import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";

import colors from "../config/color";
import color from "../config/color";

function AppInput({ icon, provider, disHeight, ...otherProps }) {
  return (
    <View style={[styles.container, { height: disHeight }]}>
      {icon && provider === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons name={icon} size={30} color={colors.medium} />
      ) : null}
      {icon && provider === "FontAwesome" ? (
        <FontAwesome name={icon} size={30} color={colors.medium} />
      ) : null}
      {icon && provider === "Entypo" ? (
        <Entypo name={icon} size={30} color={colors.medium} />
      ) : null}
      <TextInput
        placeholderTextColor={color.medium}
        style={styles.text}
        textAlignVertical="top"
        {...otherProps}
      ></TextInput>
    </View>
  );
}

export default AppInput;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 30,
    height: 60,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    marginVertical: 7,
  },
  text: {
    color: colors.dark,
    fontSize: 20,
    marginLeft: 12,
    flex: 1,
  },
});
