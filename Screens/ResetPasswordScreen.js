import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import * as Animatable from "react-native-animatable";
import AppButton from "../Components/AppButton";
import AppInput from "../Components/AppInput";
import AppErrorMessage from "../Components/AppErrorMessage";
import colors from "../config/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Validation = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

function ResetPasswordScreen({ navigation }) {
  // forgot password email send code ......................
  const forgotPassword = async (value) => {
    await firebase
      .auth()
      .sendPasswordResetEmail(value.email)
      .then(() => {
        alert("Password reset email has been send .");
      });
  };

  return (
    <View style={styles.animationContainer}>
      <View style={styles.container1}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={colors.white}
          style={{ top: 60, left: 20 }}
          onPress={() => navigation.goBack()}
        />
        <Animatable.Text
          animation="fadeInLeftBig"
          duration={1500}
          style={styles.loginText}
        >
          RESET PASSWORD
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.container}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Validation}
          onSubmit={(value) => {
            forgotPassword(value);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <>
              <AppInput
                icon="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
              />
              <AppErrorMessage error={errors.email} visible={touched.email} />

              <AppButton
                color="secondary"
                title="Reset"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    paddingTop: 30,
  },
  image: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  imagecontainer: {
    marginBottom: "50%",
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  animationContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  container1: {
    flex: 1,
  },
  loginText: {
    fontSize: 32,
    fontWeight: "bold",
    position: "absolute",
    bottom: 15,
    left: 20,
    color: colors.white,
  },
});
