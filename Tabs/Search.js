import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, FlatList, Image, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, Star, MapPin, Trash } from "lucide-react-native";

const SearchPage = () => {

  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState("")

  const searchPost =  async () => {
    try{
      const user_id = await AsyncStorage.getItem("id")
      const usernames = await AsyncStorage.getItem("username")
      setUsername(usernames)
      const db = await SQLite.openDatabaseAsync("memorySharing")
      const result = await db.getAllAsync("SELECT * FROM posts WHERE user_id = ? AND title = ?", [user_id,title])
      if(result.length === 0){
        Alert.alert("post not found")
      }
      setPosts(result)
    }catch(error){
      console.log(error)
    }
  }



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
          source={require("../assets/me.png")}
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
    </View>
  );

  return (
    <View style={styles.container1}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Search..." onChangeText={setTitle}/>
        <Button title="Search" color="#7c3aed" onPress={searchPost}/>
      </View>
      {posts.length === 0  && <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:"red", textAlign:"center", fontWeight:"bold"}}>use search bar to search post</Text>
      </View>}
      <FlatList
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 10,
    padding:10
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop:20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
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

export default SearchPage;
