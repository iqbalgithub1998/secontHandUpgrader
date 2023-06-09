import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
// import "firebase/storage";
import AppButton from "../Components/AppButton";
import AppInput from "../Components/AppInput";
import SafeScreen from "../Components/SafeScreen";
import color from "../config/color";
import ProfileImageInput from "../Components/ProfileImageInput";
import AuthContext from "../Auth/context";
import LoadingScreen from "./LoadingScreen";

function EditProfile(props) {
  const authContext = useContext(AuthContext);
  const user = { ...authContext.user };
  const db = firebase.firestore();
  const [uri, setUri] = useState(user.photoURL);
  const [loading, setLoading] = useState(false);

  const profilePhotoUpload = async () => {
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      // const storageRef = firebase.storage().ref();
      storageRef
        .child("UserImages/" + user.email)
        .put(blob)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then(async (url) => {
            let newUser = firebase.auth().currentUser;
            await newUser.updateProfile({
              photoURL: url,
            });
            console.log("upload successful");
            authContext.setUser({
              displayName: newUser.displayName,
              email: newUser.email,
              photoURL: newUser.photoURL,
              uid: newUser.uid,
            });
            db.collection("Users")
              .doc(newUser.uid)
              .set({
                displayName: newUser.displayName,
                email: newUser.email,
                photoURL: newUser.photoURL,
                uid: newUser.uid,
              })
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                console.log(error.message);
              });
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editprofile = (uri) => {
    setUri(uri);
  };

  return (
    <SafeScreen style={styles.container}>
      <LoadingScreen visible={loading} />
      <View style={styles.imageContainer}>
        <ProfileImageInput uri={uri} onSelect={editprofile} />
      </View>
      <View style={styles.textContainer}>
        <AppInput value={user.displayName} editable={false} />
        <AppInput value={user.email} editable={false} />
        <AppButton
          title="Update"
          color="primary"
          onPress={profilePhotoUpload}
        />
      </View>
    </SafeScreen>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 70,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 80,
  },
  textContainer: {
    padding: 20,
  },
});
