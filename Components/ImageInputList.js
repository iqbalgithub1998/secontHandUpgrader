import React from "react";
import { View, StyleSheet } from "react-native";
import AppImageInput from "./AppImageInput";

function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  return (
    <View style={styles.container}>
      {imageUris.map((uri) => (
        <View key={uri} style={styles.imageList}>
          <AppImageInput uri={uri} onSelect={onRemoveImage} />
        </View>
      ))}
      {imageUris.length < 1 && <AppImageInput onSelect={onAddImage} />}
    </View>
  );
}

export default ImageInputList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageList: {
    marginHorizontal: 10,
  },
});
