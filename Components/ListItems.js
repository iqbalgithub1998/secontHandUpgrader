import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import AppIcon from "../Components/AppIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";

function ListItems({ icon, title, subTitle, onPress, image, color, arrow }) {
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.container}>
        {icon && <AppIcon name={icon} backgroundColor={color} />}
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
        </View>
        {arrow && <MaterialCommunityIcons name="chevron-right" size={30} />}
      </View>
    </TouchableHighlight>
  );
}

export default ListItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.medium,
    fontSize: 16,
  },
});
