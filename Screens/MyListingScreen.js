import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import AuthContext from "../Auth/context";
import Card from "../Components/Card";
import color from "../config/color";

function MyListingScreen(props) {
  const authContext = useContext(AuthContext);
  const user = { ...authContext.user };
  const db = firebase.firestore();
  const [posts, setPosts] = useState(null);

  // fatch listing code ..............................
  const fatchListing = () => {
    try {
      db.collection("Posts")
        .where("postBy", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          let post = [];
          querySnapshot.forEach((doc) => {
            post.push(doc.data());
          });
          setPosts([...post]);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const deletePost = (item) => {
    try {
      Alert.alert("Delete Post", "Are you sure you want to delete this post ", [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            db.collection("Posts")
              .doc(item.id)
              .delete()
              .then(() => {
                alert("Delete Done");
                //fatchListing();
                let postArray = [...posts];
                let newPost = postArray.filter((p) => p.id !== item.id);
                setPosts([...newPost]);
              });
          },
        },
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    fatchListing();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={item.price}
              image={item.image}
              onPress={() => {
                console.log(item);
              }}
              trace="true"
              deletePress={() => deletePost(item)}
              edit="true"
              editPress={() => console.log("edit Press")}
            />
          )}
        />
      </View>
    </View>
  );
}

export default MyListingScreen;

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: color.light, flex: 1 },
});
