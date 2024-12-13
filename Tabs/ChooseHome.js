import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePost from "./HomePost";
import HomeMap from "./HomeMap";
import { Image } from "react-native";
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomePost">
      <Drawer.Screen
        name="HomePost"
        component={HomePost}
        options={{
          drawerLabel: "Feed",
          headerRight: () => (
            <Image
              source={require("../assets/dalivalogo.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#7c3aed",
                marginRight: 10,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="HomeMap"
        component={HomeMap}
        options={{ drawerLabel: "Home Map" }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
