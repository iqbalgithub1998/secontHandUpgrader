import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import AuthNavigation from "./Navigation/AuthNavigation";

import firebase from 'firebase/compat/app';
import AuthContext from "./Auth/context";
import storage from "./Auth/storage";
import navigationTheme from "./Navigation/navigationTheme";
import ListingNavigation from "./Navigation/ListingNavigation";

const firebaseConfig = {
  apiKey: "AIzaSyBCeSbb6b3nU81gA_V7fm_-8PwMaLh5PxA",
  authDomain: "second-hand-2c569.firebaseapp.com",
  projectId: "second-hand-2c569",
  storageBucket: "second-hand-2c569.appspot.com",
  messagingSenderId: "1015871728260",
  appId: "1:1015871728260:web:2ba82f02c25c76983eb0d1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const usr = await storage.getUser();
    if (!usr) return;
    setUser(usr);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {!user ? <AuthNavigation /> : <ListingNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
