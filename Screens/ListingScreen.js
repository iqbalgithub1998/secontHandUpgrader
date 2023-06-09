import React, { useState } from "react";
import { ToastAndroid, FlatList, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import Card from "../Components/Card";
import SafeScreen from "../Components/SafeScreen";
import colors from "../config/color";
import { useEffect } from "react";
import ActivityIndicator from "../Components/ActivityIndicator";

function ListingScreen({ navigation }) {
  const [likeItems, setLikeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const db = firebase.firestore();

  // fetching listing from server .......................
  const fetchListing = async () => {
    setLoading(true);
    try {
      db.collection("Posts")
        .orderBy("date", "desc")
        .get()
        .then((snapshot) => {
          const listing = [];
          snapshot.docs.forEach((doc) => {
            listing.push(doc.data());
          });
          setListings([...listing]);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListing();
    fatchLike();
  }, []);

  const fatchLike = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Like_Items");
      jsonValue != null ? setLikeItems(JSON.parse(jsonValue)) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const storeLike = async (arr) => {
    try {
      const jsonValue = JSON.stringify(arr);
      await AsyncStorage.setItem("@Like_Items", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const findIndex = (item) => {
    let arr = likeItems;
    const index = (x) => x.id === item.id;
    return arr.findIndex(index);
  };

  const getLike = (item) => {
    let arr = [...likeItems];
    let index = arr.findIndex((x) => x.id === item.id);
    if (index == -1) {
      arr.push(item);
      setLikeItems(arr);
      storeLike(arr);
      showToast("Favourite Added");
    } else {
      arr.splice(index, 1);
      setLikeItems(arr);
      storeLike(arr);
      showToast("Favourite Removed");
    }
  };

  return (
    <SafeScreen style={styles.container}>
      <ActivityIndicator visible={loading} />

      <View style={styles.list}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Animatable.View animation="fadeInUpBig" duration={1500}>
              <Card
                title={item.title}
                subTitle={"₹ " + item.price}
                image={item.image}
                like={findIndex(item)}
                onPress={() =>
                  navigation.navigate("ListingDetails", { ...item })
                }
                likePress={() => getLike(item)}
              />
            </Animatable.View>
          )}
          refreshing={refreshing}
          onRefresh={() => {
            fetchListing();
            fatchLike();
          }}
        />
      </View>
    </SafeScreen>
  );
}

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
});
