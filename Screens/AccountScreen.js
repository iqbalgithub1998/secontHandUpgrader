import React, { useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import ListItems from "../Components/ListItems";
import AppImage from "../Components/AppImage";
import colors from "../config/color";
import SafeScreen from "../Components/SafeScreen";
import AuthContext from "../Auth/context";
import storage from "../Auth/storage";

function AccountScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  let user = { ...authContext.user };
  const logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        authContext.setUser(null);
        storage.removeUser();
      });
  };

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItems
          title={user.displayName}
          subTitle={user.email}
          image={user.photoURL}
          arrow="arrow"
          onPress={() => navigation.navigate("editProfile")}
        />
      </View>
      <View style={styles.container}>
        <ListItems
          title="My Posts"
          icon="format-list-bulleted"
          color="primary"
          arrow="arrow"
          onPress={() => navigation.navigate("MyPost")}
        />
        <ListItems
          title="My Messages"
          icon="email"
          color="secondary"
          arrow="arrow"
          onPress={() => navigation.navigate("Messages")}
        />
        <ListItems
          title="My Favourite"
          icon="heart"
          color="lightBlue"
          arrow="arrow"
          onPress={() => navigation.navigate("favourite")}
        />
      </View>
      <ListItems
        title="Log Out"
        icon="logout"
        color="yellow"
        onPress={logoutUser}
      />
    </SafeScreen>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
