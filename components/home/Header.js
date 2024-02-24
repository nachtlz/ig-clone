import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ navigation }) => {
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [iconOpacity, setIconOpacity] = useState(1);
  const [heartOpacity, setHeartOpacity] = useState(1);
  const [sentOpacity, setSentOpacity] = useState(1);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          const auth = getAuth();
          signOut(auth);
        }}
        onPressOut={() => {
          setLogoOpacity(1);
        }}
        onPressIn={() => {
          setLogoOpacity(0.5);
        }}
      >
        <Image
          style={{ ...styles.logo, opacity: logoOpacity }}
          source={require("../../assets/header-logo.png")}
        />
      </Pressable>

      <View style={styles.iconsContainer}>
        <Pressable
          onPress={() => {
            navigation.push("NewPostScreen");
          }}
          onPressOut={() => {
            setIconOpacity(1);
          }}
          onPressIn={() => {
            setIconOpacity(0.5);
          }}
        >
          <Image
            source={require("../../assets/add.png")}
            style={{ ...styles.icon, opacity: iconOpacity }}
          />
        </Pressable>
        <Pressable
          onPressOut={() => {
            setHeartOpacity(1);
          }}
          onPressIn={() => {
            setHeartOpacity(0.5);
          }}
        >
          <Image
            source={require("../../assets/heart.png")}
            style={{ ...styles.icon, opacity: heartOpacity }}
          />
        </Pressable>
        <Pressable
          onPressOut={() => {
            setSentOpacity(1);
          }}
          onPressIn={() => {
            setSentOpacity(0.5);
          }}
        >
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={require("../../assets/sent.png")}
            style={{ ...styles.icon, opacity: sentOpacity }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },

  iconsContainer: {
    flexDirection: "row",
  },

  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },

  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },

  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});

export default Header;
