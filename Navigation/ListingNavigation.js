import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import color from "../config/color";
import ListingScreen from "../Screens/ListingScreen";
import ProductDetailsScreen from "../Screens/ProductDetailsScreen";
import ViewImageScreen from "../Screens/ViewImageScreen";
import TabNavigation from "./TabNavigation";
const Stack = createStackNavigator();

const ListingNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="List"
      component={TabNavigation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ProductDetailsScreen}
      options={{
        headerStyle: { backgroundColor: color.primary },
        headerTintColor: color.white,
        headerTitle: "Listing Details",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ViewImage"
      component={ViewImageScreen}
      options={{
        headerStyle: { backgroundColor: color.black },
        headerTintColor: color.white,
        headerTitle: " ",
      }}
    />
  </Stack.Navigator>
);

export default ListingNavigation;
