import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import colors from "../config/color";

const categoriesList = [
  {
    label: "Mobiles",
    icon: "mobile-friendly",
    provider: "MaterialIcons",
  },
  {
    label: "Clothes",
    icon: "person-booth",
    provider: "FontAwesome5",
  },
  {
    label: "motorbike",
    icon: "pedal-bike",
    provider: "MaterialIcons",
  },
  {
    label: "Electronics & Appliances",
    icon: "personal-video",
    provider: "MaterialIcons",
  },
  {
    label: "Vehicles & Spares",
    icon: "car",
    provider: "MaterialCommunityIcons",
  },
  {
    label: "Furniture",
    icon: "table-furniture",
    provider: "MaterialCommunityIcons",
  },
  {
    label: "Fashion",
    icon: "human-female-female",
    provider: "MaterialCommunityIcons",
  },
  {
    label: "Books",
    icon: "book-open-page-variant",
    provider: "MaterialCommunityIcons",
  },
  {
    label: "Sports",
    icon: "sports-tennis",
    provider: "MaterialIcons",
  },
  {
    label: "Services",
    icon: "miscellaneous-services",
    provider: "MaterialIcons",
  },
  {
    label: "Others",
    icon: "devices-other",
    provider: "MaterialIcons",
  },
];

function AppPicker({ selectedItem, onSelectItem }) {
  const [viewModal, setViewModal] = useState(false);

  function renderLogo() {
    if (selectedItem && selectedItem.provider === "MaterialIcons") {
      return (
        <MaterialIcons
          name={selectedItem.icon}
          size={30}
          color={colors.medium}
        />
      );
    } else if (
      selectedItem &&
      selectedItem.provider === "MaterialCommunityIcons"
    ) {
      return (
        <MaterialCommunityIcons
          name={selectedItem.icon}
          size={30}
          color={colors.medium}
        />
      );
    } else if (selectedItem && selectedItem.provider === "FontAwesome5") {
      return (
        <FontAwesome5
          name={selectedItem.icon}
          size={30}
          color={colors.medium}
        />
      );
    } else {
      return <MaterialIcons name="category" size={30} color={colors.medium} />;
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setViewModal(true)}>
        <View style={styles.container}>
          {renderLogo()}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>Category</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={viewModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={35}
              onPress={() => setViewModal(false)}
            />
            <Text style={styles.headerText}> Choose Category</Text>
          </View>
          <FlatList
            data={categoriesList}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setViewModal(false);
                  onSelectItem(item);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8,
                  }}
                >
                  {item.provider === "MaterialIcons" ? (
                    <MaterialIcons name={item.icon} size={30} />
                  ) : null}
                  {item.provider === "MaterialCommunityIcons" ? (
                    <MaterialCommunityIcons name={item.icon} size={30} />
                  ) : null}
                  {item.provider === "FontAwesome5" ? (
                    <FontAwesome5 name={item.icon} size={30} />
                  ) : null}
                  <Text style={styles.categories}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
          />
        </View>
      </Modal>
    </>
  );
}

export default AppPicker;

const styles = StyleSheet.create({
  categories: {
    fontSize: 20,
    margin: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 30,
    height: 60,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  modalHeader: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.input,
    alignItems: "center",
  },
  placeholder: {
    color: colors.medium,
    fontSize: 20,
    marginLeft: 12,
    flex: 1,
  },
  seperator: {
    width: "99%",
    height: 1,
    marginLeft: 10,
    backgroundColor: colors.input,
  },
  text: {
    color: colors.dark,
    fontSize: 20,
    marginLeft: 12,
    flex: 1,
  },
});
