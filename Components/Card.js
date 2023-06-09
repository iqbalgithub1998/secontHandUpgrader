import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";
import LikeButton from "./LikeButton";

function Card({
  title,
  subTitle,
  image,
  onPress,
  like,
  likePress,
  trace,
  deletePress,
  edit,
  editPress,
}) {
  let likebtn = null;
  if (like || like == 0) {
    likebtn = (
      <LikeButton style={styles.icon} show={like} onPress={likePress} />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={{ uri: image }}>
          {likebtn}
        </ImageBackground>
        <View style={styles.footer}>
          <View style={styles.textContainer}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
              numberOfLines={1}
            >
              {subTitle}
            </Text>
            <Text style={[styles.text, { marginBottom: 10 }]}>{title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginRight: 15,
            }}
          >
            {trace ? (
              <MaterialCommunityIcons
                style={styles.icon}
                name="delete-forever"
                size={30}
                color={colors.black}
                onPress={deletePress}
              />
            ) : (
              []
            )}
            {edit ? (
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  top: 5,
                  right: 40,
                  elevation: 1,
                }}
                name="file-edit"
                size={30}
                color={colors.color}
                onPress={editPress}
              />
            ) : (
              []
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 5,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    margin: 10,
  },

  text: {
    fontSize: 14,
    color: colors.grey,
  },
});
