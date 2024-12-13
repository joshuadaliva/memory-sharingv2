import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import Favorite from "./Tabs/Favorite";
import { Home, Search, Plus, Heart, User } from "lucide-react-native";
import ChooseHome from "./Tabs/ChooseHome";
import AddPost from "./Tabs/Addpost";
import Profile from "./Tabs/Profile";
import SearchPage from "./Tabs/Search";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Home"
      component={ChooseHome}
      options={{ title: "Home" }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ title: "Search" }}
    />
  </Stack.Navigator>
);

const AddStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Add"
      component={AddPost}
      options={{ title: "New Post" }}
    />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Favorite"
      component={Favorite}
      options={{ title: "Favorites" }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
  </Stack.Navigator>
);

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          const color = focused ? "white" : "#7c3aed";
          const backgroundColor = focused ? "#7c3aed" : "transparent";
          return (
            <View style={[styles.iconContainer, { backgroundColor }]}>
              {route.name === "HomeTab" && <Home color={color} size={size} />}
              {route.name === "SearchTab" && (
                <Search color={color} size={size} />
              )}
              {route.name === "AddTab" && <Plus color={color} size={size} />}
              {route.name === "FavoriteTab" && (
                <Heart color={color} size={size} />
              )}
              {route.name === "ProfileTab" && (
                <User color={color} size={size} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="AddTab" component={AddStack} />
      <Tab.Screen name="FavoriteTab" component={FavoriteStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 70,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    shadowColor: "#7c3aed",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 5,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
