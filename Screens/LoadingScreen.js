import React from "react";
import LottieView from "lottie-react-native";
import { Modal, StyleSheet, View } from "react-native";
import color from "../config/color";

function LoadingScreen({ visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          style={{ width: 250, backgroundColor: color.secondary }}
          autoPlay
          loop
          source={require("../assets/Animation/newloading.json")}
        />
      </View>
    </Modal>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: color.secondary,
  },
});
