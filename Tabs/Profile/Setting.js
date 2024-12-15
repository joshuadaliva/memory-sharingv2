import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Eye, EyeOff, Lock, PlusCircle } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import {updateInfo} from '../../database_actions/updateInfo'
import {updatePassword} from '../../database_actions/updateInfo'

const Setting = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null)
  const [newUsername, setNewUsername] = useState(username || "");
  const [newEmail, setNewEmail] = useState(email || "");
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [new2Password, setNew2Password] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("permission required, Access to media library is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("permission required, Access to camera is required");
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const email = await AsyncStorage.getItem("email");
        const profile = await AsyncStorage.getItem("image");
        setCurrentProfile(profile)
        setUsername(username);
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [navigation,newUsername]);

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Profile Information</Text>
        <Image
          source={currentProfile? {uri: currentProfile} : require("../../assets/me.png")}
          style={styles.profileImage}
        />
        <Text>Username: {username}</Text>
        <Text>Email: {email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Update Information</Text>
        <Text style={[styles.text, { fontSize: 15, marginBottom: 10 }]}>
          {" "}
          Change Profile Picture
        </Text>
        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <PlusCircle size={24} color="gray" />
            <Text style={styles.buttonText}>Add Image</Text>
          </TouchableOpacity>
          <Text>OR</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={takePicture}>
            <PlusCircle size={24} color="gray" />
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.text,
            { fontSize: 15, marginTop: 20, marginBottom: 0 },
          ]}
        >
          {" "}
          Change Profile Information
        </Text>
        <TextInput
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Enter new username"
          style={styles.input}
        />
        <TextInput
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="Enter new email"
          style={styles.input}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#7c3aed",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            marginTop:5
          }}
          onPress={async () => {
            const result = await updateInfo(image, newUsername, newEmail);
            if (result) {
                setImage(null);
                setNewUsername("");
                setNewEmail("");
            }
          }}
        >
          <Text style={{ color: "white" }}> Update Information </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Update Password</Text>
        <Text
          style={[
            styles.text,
            { fontSize: 15, marginTop: 20, marginBottom: 0 },
          ]}
        >
          {" "}
          Change Password
        </Text>
        <View style={styles.inputContainer}>
              <Lock color="gray" size={20} />
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter old password"
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
        <View style={styles.inputContainer}>
              <Lock color="gray" size={20} />
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter New Password"
                placeholderTextColor="gray"
                value={newPassword}
                onChangeText={setNewPassword}
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
        <View style={styles.inputContainer}>
              <Lock color="gray" size={20} />
              <TextInput
                style={styles.passwordInput}
                placeholder="Reenter new password"
                placeholderTextColor="gray"
                value={new2Password}
                onChangeText={setNew2Password}
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
        <TouchableOpacity
          style={{
            backgroundColor: "#7c3aed",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            marginTop:5
          }}
          onPress={async () => {
            const result = await updatePassword(password,newPassword,new2Password);
            if (result) {
              setPassword(null);
              setNewPassword("");
              setNew2Password("");
            }
          }}
        >
          <Text style={{ color: "white" }}> Update Password </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
  },
  section: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    borderRadius: 10,
    margin: 5,
  },
  inputContainer: {
    flexDirection : 'row',
    alignItems: 'center',
    borderColor: '#e5e7eb',
    justifyContent :'center',
    backgroundColor : '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width : "100%"
  },
  passwordInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    border: "none",
    color:"#030712",
    outline:'none',
    borderWidth: 0,
  },
});
