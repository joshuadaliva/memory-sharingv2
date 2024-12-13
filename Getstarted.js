import { SafeAreaView, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";

import { useStore } from "./store/useStore";

const Getstarted = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.background);

  return (
    <SafeAreaView
      style={{
        alignItems: "space-between",
        justifyContent: "center",
        position: "relative",
        flex: 1,
        backgroundColor: isDarkMode ? "#030712" : "#ffffff",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View>
          <Image
            source={require("./assets/dalivalogo.png")}
            style={{ width: 300, marginBottom: 20, height: 300 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            gap: 20,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: isDarkMode ? "white" : "black",
              textAlign: "center",
            }}
          >
            Share Your Memories location Online
          </Text>
          <Text style={{ textAlign: "center", color: "gray" }}>
            Share your memory Online, Communicate with your friends , and share
            your memories via pinning and location.
          </Text>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#7c3aed",
                justifyContent: "center",
                borderRadius: 50,
                padding: 15,
                alignItems: "center",
                width: "100%",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={{ color: "white" }}> Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Getstarted;
