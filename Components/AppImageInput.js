import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import color from "../config/color";
import { useEffect } from "react";

function AppImageInput({ uri, onSelect }) {
  useEffect(() => {
    permissions();
  }, []);

  const handlePress = () => {
    if (!uri) pickImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this Image", [
        { text: "No" },
        { text: "Yes", onPress: () => onSelect(uri) },
      ]);
  };

  const permissions = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert(
        "Camera Permission",
        "Sorry, we need camera roll permissions to make this work!",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => permissions() },
        ],
        { cancelable: false }
      );
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.2,
    });

    if (!result.cancelled) {
      onSelect(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!uri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={color.medium}
          />
        )}
        {uri && <Image source={{ uri: uri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AppImageInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.input,
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
