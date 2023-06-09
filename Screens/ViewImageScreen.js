import React from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../config/color";

function ViewImageScreen({ route }) {
  const image = route.params;
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: image }}
      />
    </View>
  );
}

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
