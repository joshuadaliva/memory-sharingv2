import { useState, useEffect } from "react";
import getStyle from "./styles";
import BgMode from "./component/BgMode";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { User, Lock, ArrowRightCircle, Eye, EyeOff } from "lucide-react-native";
import login from "./database_actions/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(null);


  useEffect(() => {
    const setDarkMode = async () => {
      const result = await AsyncStorage.getItem("dark")
      setIsDark(result === "true"? true : false)
    }
    setDarkMode()
  }, [])

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const resultLogin = await login (email,password);
      if(resultLogin){
        setTimeout(() => {
          navigation.navigate("Main");
        },200)
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };


  const styles = getStyle(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.Signupage}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 10,
              color: isDark ? "white" : "#030712",
            }}
          >
            Login
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <View style={{flexDirection:"row"}}>
                <Text style={{color: isDark ? "white" : "#030712"}}>Doesn't Have an account?</Text>
                <Text style={{ color: "#7c3aed" }}> Sign up </Text>
              </View>
            </TouchableOpacity>
          <BgMode isDark={isDark} setIsDark={setIsDark} />
        </View>
        <View
          style={{
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "column", width: "96%" }}>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                color: isDark ? "white" : "#030712",
              }}
            >
              Enter your Email:
            </Text>
            <View style={styles.inputContainer}>
              <User color="gray" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View
              style={{
                marginBottom: 5,
                flexDirection: "row",
                alignItems: "start",
                width: "90%",
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 15,
                  color: isDark ? "white" : "#030712",
                }}
              >
                Enter your Password:
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Lock color="gray" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff color="gray" size={20} />
                ) : (
                  <Eye color="gray" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <ArrowRightCircle color="white" size={20} />
                    <Text style={styles.buttonText}>Login</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <StatusBar barStyle="auto" />
    </SafeAreaView>
  );
};

export default Login;
