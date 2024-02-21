import React, { useState } from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

export const bottomTabIcons = [
  {
    name: "Home",
    active: require("../../assets/house-active.png"),
    inactive: require("../../assets/house-inactive.png"),
  },
  {
    name: "Search",
    active: require("../../assets/search-active.png"),
    inactive: require("../../assets/search-inactive.png"),
  },
  {
    name: "Reels",
    active: require("../../assets/reels-active.png"),
    inactive: require("../../assets/reels-inactive.png"),
  },
  {
    name: "Shop",
    active: require("../../assets/shop-active.png"),
    inactive: require("../../assets/shop-inactive.png"),
  },
  {
    name: "Profile",
    active: require("../../assets/gaviota.jpg"),
    inactive: require("../../assets/gaviota.jpg"),
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <Pressable onPress={() => setActiveTab(icon.name)}>
      <Image
        source={activeTab === icon.name ? icon.active : icon.inactive}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#FFF",
  }),
});

export default BottomTabs;
