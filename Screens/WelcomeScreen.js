import React from "react";
import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import AppButton from "../Components/AppButton";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require("../assets/oldproduct.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/oldlogo.png")} />
        <Text style={styles.description}>Sell What You Don't Need.</Text>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          title="login"
          color="primary"
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnContainer: {
    padding: 10,
    width: "100%",
  },
  description: {
    fontSize: 18,
    fontWeight: "700",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
  },
});
