import { View, Image, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";

const PLACEHOLDER_IMG = "https://placehold.jp/150x150.png";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUsername = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("owner_uid", "==", user.uid), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCurrentLoggedInUser({
        username: doc.data().username,
        profilePicture: doc.data().profile_picture,
      });
    });
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = async (imageUrl, caption) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userDocRef = doc(collection(db, "users"), user.email);
    const postDocRef = await addDoc(collection(userDocRef, "posts"), {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profilePicture,
      owner_uid: user.uid,
      owner_email: user.email,
      caption: caption,
      createAt: serverTimestamp(),
      likes_by_users: [],
      comments: [],
    }).then(() => navigation.goBack());
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18, marginTop: 15 }}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}

          <View style={{ marginTop: 15 }}>
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
