import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert
} from "react-native";
import { Heart, Star, MapPin, Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteFavorite } from "../database_actions/deleteMemory";

const Favorite = ({ navigation }) => {

  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState("")
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const user_id = await AsyncStorage.getItem("id")
      const usernames = await AsyncStorage.getItem("username")
      setUsername(usernames)
      const profile = await AsyncStorage.getItem("image")
      setImage(profile)
      const db = await SQLite.openDatabaseAsync("memorySharing")
      const result = await db.getAllAsync("SELECT * FROM Favorites WHERE user_id = ?", [Number(user_id)])
      setPosts(result)
    }
    fetchPosts()
  },[navigation,posts])

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.userInfo}>
      <Image
            source={image? {uri:image} : require("../assets/mee.png")}
            style={styles.userImage}
            resizeMode="cover"
          />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="gray" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.caption}>{item.caption}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Trash size={24} strokeWidth={2} color="orange" onPress={() => {
            Alert.alert(
              "delete post",
              "do you want to delete this favorite?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    console.log("you canceled delete");
                  },
                },
                {
                  text: "delete",
                  onPress: () => {
                    deleteFavorite(item.post_id)
                  },
                },
              ],
              { cancelable: false }
            );
          }}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  if(posts.length === 0){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:"red", textAlign:"center", fontWeight:"bold"}}>NO Favorites YET TRY TO MAKE ONE</Text>
      </View>
    )
  }

  return (
    <View style={styles.container1}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  postContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    color: "gray",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    padding: 10,
    fontSize: 20,
    marginBottom: 0,
    paddingBottom: 0,
  },
  caption: {
    marginTop: 0,
    padding: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "gray",
    lineHeight: 21,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default Favorite;
