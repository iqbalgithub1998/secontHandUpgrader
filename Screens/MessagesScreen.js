import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import colors from "../config/color";
import SafeScreen from "../Components/SafeScreen";
import MessageList from "../Components/MessageList";

function MessagesScreen(props) {
  const Messages = [
    {
      id: 101,
      name: "Iqbal khan",
      message: "I want this .",
      avatar: require("../assets/mosh.jpg"),
    },
    {
      id: 102,
      name: "Saif khan",
      message: "Any discount Please..",
      avatar: require("../assets/camera.jpg"),
    },
    {
      id: 103,
      name: "Saja Das",
      message: "Deal Done.",
      avatar: require("../assets/jacket.jpg"),
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={Messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => <MessageList message={item} />}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </View>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.light },
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.input,
  },
});
