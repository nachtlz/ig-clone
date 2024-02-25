import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: require("../../assets/heart.png"),
    likedImageUrl: require("../../assets/likedHeart.png"),
  },
  {
    name: "Comment",
    imageUrl: require("../../assets/comments.png"),
  },
  {
    name: "Share",
    imageUrl: require("../../assets/sent.png"),
  },
  {
    name: "Save",
    imageUrl: require("../../assets/save.png"),
  },
];

const Post = ({ post }) => {
  const [currentPost, setCurrentPost] = useState(post);

  const handleLike = async (post) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const currentLikesStatus = !post.likes_by_users.includes(user.email);
      const userDocRef = doc(collection(db, "users"), post.owner_email);
      const postDocRef = doc(collection(userDocRef, "posts"), post.id);
      await updateDoc(postDocRef, {
        likes_by_users: currentLikesStatus
          ? arrayUnion(user.email)
          : arrayRemove(user.email),
      });

      const updatedPost = { ...post, 
        likes_by_users: currentLikesStatus
          ? [...post.likes_by_users, user.email]
          : post.likes_by_users.filter(email => email !== user.email)
      };
      setCurrentPost(updatedPost);
    } catch (error) {
      console.error("Error al actualizar los likes:", error);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={currentPost} />
      <PostImage post={currentPost} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={currentPost} handleLike={handleLike} />
        <Likes post={currentPost} /> 
        <Caption post={currentPost} /> 
        <CommentsSection post={currentPost} /> 
        <Comments post={currentPost} />
      </View>
    </View>
  );
};


const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900", marginTop: -5 }}>
      ...
    </Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image source={postFooterIcons[0].imageUrl} style={styles.footerIcon} />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>

    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <Pressable>
    <Image style={imgStyle} source={imgUrl} />
  </Pressable>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#FF8501",
  },

  footerIcon: {
    width: 33,
    height: 33,
  },

  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});

export default Post;
