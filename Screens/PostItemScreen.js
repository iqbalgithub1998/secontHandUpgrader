import React, { useContext, useState } from "react";
import { StyleSheet, Modal, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import LottieView from "lottie-react-native";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import colors from "../config/color";
import SafeScreen from "../Components/SafeScreen";
import AppPicker from "../Components/AppPicker";
import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import AppErrorMessage from "../Components/AppErrorMessage";
import FormImageInput from "../Components/FormImageInput";
import AuthContext from "../Auth/context";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Please select at least one image"),
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().required().min(1).label("Description"),
  price: Yup.number().required().min(1).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  city: Yup.string().required().label("City"),
});

function PostItemScreen(props) {
  const [modal, setModal] = useState(false);
  const authContext = useContext(AuthContext);
  const user = { ...authContext.user };
  const postID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const todayDate = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + " " + time;
  };

  const uploadPost = (values) => {
    let postid = postID();
    try {
      setModal(true);
      values.images.map(async (value) => {
        //let name = value.substring(value.lastIndexOf("/") + 1);
        let response = await fetch(value);
        let blob = await response.blob();
        const storageRef = firebase.storage().ref();
        storageRef
          .child("Posts/" + postid)
          .put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then(async (url) => {
              const dbh = firebase.firestore();
              await dbh.collection("Posts").doc(postid).set({
                id: postid,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                title: values.title,
                description: values.description,
                image: url,
                postBy: user.uid,
                price: values.price,
                city: values.city,
                category: values.category.label,
              });
            });
          });
      });
    } catch (error) {}
  };

  return (
    <SafeScreen style={styles.container}>
      <Formik
        initialValues={{
          category: null,
          city: "",
          description: "",
          images: [],
          price: "",
          title: "",
        }}
        onSubmit={(values, { resetForm }) => {
          uploadPost(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
          setFieldValue,
          values,
        }) => (
          <>
            {/* Image Input */}
            <FormImageInput name="images" />
            {/** Title Input */}
            <AppInput
              placeholder="Title"
              onBlur={() => setFieldTouched("title")}
              onChangeText={handleChange("title")}
              value={values.title || ""}
            />
            <AppErrorMessage error={errors.title} visible={touched.title} />

            {/** description Input */}
            <AppInput
              placeholder="Description"
              numberOfLines={5}
              onBlur={() => setFieldTouched("description")}
              onChangeText={handleChange("description")}
              value={values.description || ""}
              multiline={true}
              // numberOfLines={5}
              disHeight={120}
            />
            <AppErrorMessage
              error={errors.description}
              visible={touched.description}
            />

            {/** category Input */}
            <AppPicker
              selectedItem={values.category}
              onSelectItem={(item) => setFieldValue("category", item)}
              value={values.title || null}
            />
            <AppErrorMessage
              error={errors.category}
              visible={touched.category}
            />

            {/** price Input */}
            <AppInput
              icon="rupee"
              provider="FontAwesome"
              placeholder="Price"
              keyboardType="number-pad"
              onBlur={() => setFieldTouched("price")}
              onChangeText={handleChange("price")}
              value={values.price || ""}
            />
            <AppErrorMessage error={errors.price} visible={touched.price} />

            {/** city Input */}
            <AppInput
              icon="location"
              provider="Entypo"
              placeholder="City , Ex:-Kolkata,West Bengal"
              onBlur={() => setFieldTouched("city")}
              onChangeText={handleChange("city")}
              value={values.city || ""}
            />
            <AppErrorMessage error={errors.city} visible={touched.city} />

            <AppButton color="primary" title="Submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Modal visible={modal}>
        <View style={styles.animationContainer}>
          <LottieView
            style={{ width: 250 }}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              setTimeout(() => {
                setModal(false);
              }, 1500);
            }}
            source={require("../assets/Animation/done.json")}
          />
        </View>
      </Modal>
    </SafeScreen>
  );
}

export default PostItemScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.light, padding: 10 },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
