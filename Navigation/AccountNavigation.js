import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../Screens/AccountScreen";
import MessagesScreen from "../Screens/MessagesScreen";
import EditProfile from "../Screens/EditProfile";
import FavouriteItemScreen from "../Screens/FavouriteItemScreen";
import color from "../config/color";
import MyListingScreen from "../Screens/MyListingScreen";

const Stack = createStackNavigator();

const AccountNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="editProfile"
      component={EditProfile}
      options={{
        headerStyle: { backgroundColor: color.primary },
        headerTintColor: color.white,
        headerTitle: "Edit Profile",
      }}
    />
    <Stack.Screen
      name="MyPost"
      component={MyListingScreen}
      options={{
        headerStyle: { backgroundColor: color.primary },
        headerTintColor: color.white,
        headerTitle: "My posts",
      }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerStyle: { backgroundColor: color.primary },
        headerTintColor: color.white,
      }}
    />
    <Stack.Screen
      name="favourite"
      component={FavouriteItemScreen}
      options={{
        headerStyle: { backgroundColor: color.primary },
        headerTintColor: color.white,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigation;
