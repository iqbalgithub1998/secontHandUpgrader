import React from "react";
import { View, StyleSheet, Image } from "react-native";

function AppImage(props) {
  return <Image style={styles.image} source={props.sourse} />;
}

export default AppImage;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
