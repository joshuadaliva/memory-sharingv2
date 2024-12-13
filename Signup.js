import { useEffect, useState } from "react";
import { useStore } from "./store/useStore";
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
import {
  User,
  Mail,
  Lock,
  ArrowRightCircle,
  Eye,
  EyeOff,
} from "lucide-react-native";
import addUser  from './database_actions/addUser';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const isDarkMode = useStore((state) => state.background);


  const handleSignUp = async () => {
    try {
      setLoading(true);
      const signup = await addUser (username, email, password);
      setIsSignedUp(signup);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  if(isSignedUp){
    navigation.navigate("Login")
    setIsSignedUp(false);
  }

  const styles = getStyle(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.Signupage}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 5,
              color: isDarkMode ? "white" : "#030712",
            }}
          >
            Sign Up
          </Text>
          <Text style={{ color: isDarkMode ? "white" : "#030712" }}>
            Already Have an Account
            <Text style={{ color: "#7c3aed" }}> login </Text>
          </Text>
          <BgMode />
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
                color: isDarkMode ? "white" : "#030712",
              }}
            >
              Enter your Username:
            </Text>
            <View style={styles.inputContainer}>
              <User  color="gray" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View
              style={{
                marginBottom: 5,
                marginLeft: 5,
                flexDirection: "row",
                alignItems: "start",
                width: "90%",
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 15,
                  color: isDarkMode ? "white" : "#030712",
                }}
              >
                Enter your Email:
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Mail color="gray" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                accessibilityLabel="Email input"
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
                  color: isDarkMode ? "white" : "#030712",
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
                accessibilityLabel="Password input"
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
                    <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUp;