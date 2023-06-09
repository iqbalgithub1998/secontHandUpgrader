import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import colors from "../config/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../Components/AppButton";
import color from "../config/color";

function ProductDetailsScreen({ navigation, route }) {
  const product = { ...route.params };
  const db = firebase.firestore();
  const [postBy, SetPostBy] = useState({});
  const date = product.date.toDate().toDateString();
  const fatchlistedBy = async () => {
    try {
      db.collection("Users")
        .doc(product.postBy)
        .get()
        .then((snapshot) => {
          SetPostBy(snapshot.data()); ///// fatch post by  ...............................
        });
    } catch (error) {}
  };

  useEffect(() => {
    fatchlistedBy();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("ViewImage", product.image)}
      >
        <ImageBackground style={styles.image} source={{ uri: product.image }}>
          <MaterialCommunityIcons
            style={styles.backIcon}
            name="arrow-left-circle-outline"
            color={color.black}
            size={35}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
      <View style={{ margin: 15 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {product.title}
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 15 }}>
          ₹ {product.price}
        </Text>
        <View style={styles.seperator}></View>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            color: colors.grey,
            fontWeight: "200",
          }}
        >
          {date}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            color: colors.grey,
            fontWeight: "200",
          }}
        >
          {product.city}
        </Text>
      </View>
      <View style={styles.cardEnd}></View>
      <View style={{ margin: 15 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
          Description
        </Text>
        <Text style={{ color: colors.grey }}>{product.description}</Text>
      </View>
      <View style={styles.cardEnd}></View>
      <View style={{ margin: 15 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
          Seller description
        </Text>
        <View style={styles.sellerContainer}>
          <Image style={styles.avatar} source={{ uri: postBy.photoURL }} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "100" }}>
              {postBy.displayName}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 5 }}>
              {postBy.email}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardEnd}></View>
      <View style={{ marginHorizontal: 10 }}>
        <AppButton
          title="Message"
          color="secondary"
          onPress={() => {
            console.log("Message pressed");
          }}
        />
      </View>
    </ScrollView>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  backIcon: {
    top: 40,
    left: 15,
  },
  cardEnd: {
    width: "100%",
    height: 3,
    backgroundColor: colors.input,
    borderBottomEndRadius: 70,
    borderBottomStartRadius: 70,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  seperator: {
    width: "99%",
    height: 1,
    backgroundColor: colors.grey,
  },
  sellerContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
});
