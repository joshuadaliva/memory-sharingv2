import { View, TouchableOpacity } from "react-native";
import { Sun, Moon } from "lucide-react-native";
import getStyle from "../styles";
import { useStore } from "../store/useStore";

const BgMode = () => {
  const changeBackground = useStore((state) => state.changeBackground);
  const isDarkMode = useStore((state) => state.background);
  const styles = getStyle(isDarkMode);
  return (
    <View style={styles.lightDark}>
      <TouchableOpacity
        onPress={() => changeBackground(true)}
        style={styles.toggleButton}
      >
        <Moon size={15} color={isDarkMode ? "#fff" : "#000"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeBackground(false)}
        style={styles.toggleButton}
      >
        <Sun size={15} color={isDarkMode ? "#fff" : "#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default BgMode;
