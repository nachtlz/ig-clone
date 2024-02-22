import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => {
  const [arrowOpacity, setArrowOpacity] = useState(1);

  return (
    <View style={styles.container}>
      <Header arrowOpacity={arrowOpacity} setArrowOpacity={setArrowOpacity} navigation={navigation} />
      <FormikPostUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ arrowOpacity, setArrowOpacity, navigation }) => (
  <View style={styles.headerContainer}>
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
      onPressOut={() => {
        setArrowOpacity(1);
      }}
      onPressIn={() => {
        setArrowOpacity(0.5);
      }}
    >
      <Image
        source={require("../../assets/back.png")}
        style={{ width: 30, height: 30, opacity: arrowOpacity }}
      />
    </Pressable>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 25,
  },
});

export default AddNewPost;
