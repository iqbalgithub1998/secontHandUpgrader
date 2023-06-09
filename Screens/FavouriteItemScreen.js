import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../Components/Card";
import color from "../config/color";

function FavouriteItemScreen(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fatchLike();
  }, []);

  const fatchLike = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Like_Items");
      jsonValue != null ? setProducts(JSON.parse(jsonValue)) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLikeList = async (item) => {
    const newListing = [...products];
    const listing = newListing.filter((list) => list.id !== item.id);
    setProducts([...listing]);
    try {
      const jsonValue = JSON.stringify(listing);
      await AsyncStorage.setItem("@Like_Items", jsonValue);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"₹ " + item.price}
            image={item.image}
            like={1}
            onPress={() => console.log(item)}
            likePress={() => {
              Alert.alert(
                "Remove Favourite",
                "Are you sure you want to remove Favourite item",
                [
                  {
                    text: "Cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => deleteLikeList(item),
                  },
                ]
              );
            }}
          />
        )}
      />
    </View>
  );
}

export default FavouriteItemScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: color.light },
  flatListContainer: {
    padding: 15,
    backgroundColor: color.light,
    flex: 1,
  },
});
