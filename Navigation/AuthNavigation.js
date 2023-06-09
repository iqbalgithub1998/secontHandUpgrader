import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../Screens/WelcomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import ResetPasswordScreen from "../Screens/ResetPasswordScreen";

const Stack = createStackNavigator();

const StackNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Wellcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={RegisterScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

export default StackNavigation;
