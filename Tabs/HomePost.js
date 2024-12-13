import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { Heart, Star, MapPin } from "lucide-react-native";

const posts = [
  {
    id: "1",
    title: "Eating at this place",
    image:
      "https://images.pexels.com/photos/693269/pexels-photo-693269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption:
      "Food is not just fuel; it's an experience that nourishes the soul. Gather around the table and let's make every bite count! 🍕✨",
    userProfile:
      "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Joshua Daliva",
    location: "City Center",
  },
  {
    id: "2",
    title: "Traveling at this place",
    image:
      "https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption:
      "Every journey is a reminder of how vast and beautiful the world is. My heart belongs to the open road and the endless possibilities it brings! 🌍✨",
    userProfile:
      "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Joshua Daliva",
    location: "Beachside",
  },
  {
    id: "3",
    title: "Relaxing at the beach",
    image:
      "https://images.pexels.com/photos/28868779/pexels-photo-28868779/free-photo-of-vibrant-coastal-sunset-with-splashing-waves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption:
      "There’s nothing quite like the sound of waves and the feeling of sand between my toes. Beach days are my happy days! 🏖️☀️",
    userProfile:
      "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Joshua Daliva",
    location: "Sunny Beach",
  },
  {
    id: "4",
    title: "Exploring the mountains",
    image:
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption:
      "The mountains are calling, and I must go! There's a sense of peace and adventure that comes with every hike. ⛰️🌲",
    userProfile:
      "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Joshua Daliva",
    location: "Mountain Peak",
  },
  {
    id: "5",
    title: "Discovering new cultures",
    image:
      "https://images.pexels.com/photos/1313814/pexels-photo-1313814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption:
      "Every new place I visit teaches me something different about the world and its people. Embracing diversity enriches my travel experience! 🌎🤝",
    userProfile:
      "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Joshua Daliva",
    location: "Cultural District",
  },
];

const HomePost = ({ navigation }) => {
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
          <Text style={styles.username}>{item.username}</Text>
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
          <Heart size={24} strokeWidth={2} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Star size={24} strokeWidth={2} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container1}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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

export default HomePost;
