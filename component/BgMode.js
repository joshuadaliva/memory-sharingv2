import { View, TouchableOpacity } from "react-native";
import { Sun, Moon } from "lucide-react-native";
import getStyle from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BgMode = ({isDark, setIsDark}) => {

  const styles = getStyle(isDark);
  return (
    <View style={styles.lightDark}>
      <TouchableOpacity
        onPress={() => {
          setIsDark(true)
          AsyncStorage.setItem("dark", "true")
        }}
        style={styles.toggleButton}
      >
        <Moon size={15} color={isDark ? "#fff" : "#000"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsDark(false)
          AsyncStorage.setItem("dark", "false")
        }}
        style={styles.toggleButton}
      >
        <Sun size={15} color={isDark ? "#fff" : "#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default BgMode;
