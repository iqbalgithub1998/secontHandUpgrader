import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Animatable from "react-native-animatable";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import AppButton from "../Components/AppButton";
import AppInput from "../Components/AppInput";
import AppErrorMessage from "../Components/AppErrorMessage";
import colors from "../config/color";
import AuthContext from "../Auth/context";
import storage from "../Auth/storage";
import LoadingScreen from "./LoadingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Validation = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const login = () => {
  return <View style={styles.container}></View>;
};

function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  // login function
  const loginUser = async ({ email, password }) => {
    let user = {
      displayName: "iqbal",
      email: "iqbalkhanak45@gmail.com",
      photoURL: "response.user.photoURL",
      uid: "123456789",
    };
    storage.storeUser(user);
    authContext.setUser(user);
    // setLoading(true);
    // try {
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then((response) => {
    //       setLoading(false);
    //       if (!response.user.emailVerified) {
    //         firebase
    //           .auth()
    //           .currentUser.sendEmailVerification()
    //           .then(() => {
    //             alert("Please Verify your acoount!");
    //             firebase.auth().signOut();
    //           });
    //       } else {
    //         let user = {
    //           displayName: response.user.displayName,
    //           email: response.user.email,
    //           photoURL: response.user.photoURL,
    //           uid: response.user.uid,
    //         };
    //         storage.storeUser(user);
    //         authContext.setUser(user);
    //       }
    //     });
    // } catch (error) {
    //   setLoading(false);
    //   alert(error.message);
    // }
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
          LOGIN
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.container}
      >
        {/* Formik Input Form is below */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Validation}
          onSubmit={(value) => {
            loginUser(value);
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
              <AppInput
                icon="lock"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={() => setFieldTouched("password")}
                textContentType="password"
                secureTextEntry
                onChangeText={handleChange("password")}
              />
              <AppErrorMessage
                error={errors.password}
                visible={touched.password}
              />

              <AppButton
                color="secondary"
                title="Login"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <View style={styles.fbContainer}>
          <Text style={styles.fb}>Forgot Password ?</Text>
          <Text
            onPress={() => navigation.navigate("ResetPassword")}
            style={{ fontSize: 14, color: "blue", fontWeight: "bold" }}
          >
            {" "}
            Click Here
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    paddingTop: 30,
  },
  fb: {
    fontSize: 14,
    fontWeight: "bold",
  },
  fbContainer: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
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
