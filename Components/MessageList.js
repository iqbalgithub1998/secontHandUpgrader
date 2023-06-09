import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";
import Swipeable from "react-native-gesture-handler/Swipeable";

function MessageList({ message }) {
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.rightSwipe}>
          <MaterialCommunityIcons
            style={{
              color: colors.white,
            }}
            name="trash-can-outline"
            size={35}
          />
        </View>
      )}
    >
      <TouchableHighlight
        underlayColor={colors.ligntGrey}
        onPress={() => console.log("clicked")}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={message.avatar} />
          <View style={styles.text}>
            <Text style={{ fontWeight: "700", fontSize: 14 }}>
              {message.name}
            </Text>
            <Text style={{ fontSize: 14, color: colors.grey }}>
              {message.message}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

export default MessageList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rightSwipe: {
    backgroundColor: colors.primary,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 10,
  },
});
