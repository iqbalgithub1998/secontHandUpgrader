import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PostItemScreen from "../Screens/PostItemScreen";

import TabListingButton from "./TabListingButton";
import AccountNavigation from "./AccountNavigation";

import ListingScreen from "../Screens/ListingScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="List"
      component={ListingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostItemScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <TabListingButton onPress={() => navigation.navigate("Post")} />
        ),
      })}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigation}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
