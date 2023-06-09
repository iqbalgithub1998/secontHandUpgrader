import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
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
import LoadingScreen from "./LoadingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Validation = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  conformPassword: Yup.string()
    .required()
    .min(8)
    .label("Conform Password")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

function RegisterScreen({ navigation }) {
  const db = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const sendVerificationEmail = async () => {
    try {
      await firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          firebase.auth().signOut();
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // signup code ****************************************
  const signup = async ({ email, password, username }) => {
    setLoading(true);
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          response.user.updateProfile({
            displayName: username,
            photoURL: "https://randomuser.me/api/portraits/lego/5.jpg",
          });
          db.collection("Users")
            .doc(response.user.uid)
            .set({
              displayName: username,
              email: response.user.email,
              photoURL: "https://randomuser.me/api/portraits/lego/5.jpg",
              uid: response.user.uid,
            })
            .then(() => {
              setLoading(false);
              Alert.alert(
                "Signup Successful",
                "Signup Successful, Please verify your account ",
                [
                  {
                    text: "OK",
                    onPress: sendVerificationEmail,
                  },
                ]
              );
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <View style={styles.animationContainer}>
      <LoadingScreen visible={loading} />
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
          SIGN UP
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.container}
      >
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            conformPassword: "",
          }}
          validationSchema={Validation}
          onSubmit={(values, { resetForm }) => {
            signup(values);
            resetForm({});
          }}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            values,
          }) => (
            <>
              <AppInput
                icon="account-cowboy-hat"
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.username || ""}
                onBlur={() => setFieldTouched("username")}
                onChangeText={handleChange("username")}
              />
              <AppErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <AppInput
                icon="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.email || ""}
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
              />
              <AppErrorMessage error={errors.email} visible={touched.email} />
              <AppInput
                icon="lock"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.password || ""}
                onBlur={() => setFieldTouched("password")}
                textContentType="password"
                secureTextEntry
                onChangeText={handleChange("password")}
              />
              <AppErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <AppInput
                icon="lock"
                placeholder="confirm password"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.conformPassword || ""}
                onBlur={() => setFieldTouched("conformPassword")}
                textContentType="password"
                secureTextEntry
                onChangeText={handleChange("conformPassword")}
              />
              <AppErrorMessage
                error={errors.conformPassword}
                visible={touched.conformPassword}
              />
              <View>
                <Text style={styles.text1}>
                  By signing up you agree our{" "}
                  <Text style={styles.text2}>Terms and Conditions </Text>
                  <Text>and</Text>
                  <Text style={styles.text2}> Privacy Policy</Text>
                </Text>
              </View>

              <AppButton
                color="secondary"
                title="Sign Up"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
}

export default RegisterScreen;

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
    marginBottom: "30%",
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text1: {
    color: colors.medium,
    marginLeft: 10,
    fontWeight: "100",
    marginVertical: 10,
  },
  text2: {
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
