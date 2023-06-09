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

function ProfileImageInput({ uri, onSelect }) {
  useEffect(() => {
    permissions();
  }, []);

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
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.cancelled) {
      onSelect(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
      <View style={styles.container}>
        {uri && <Image source={{ uri: uri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProfileImageInput;

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
