import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { PlusCircle, MapPin, Rss } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import postMemory from "../database_actions/postMemory";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(!permission.granted){
      Alert.alert("permission required, Access to media library is required")
        return
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
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if(!permission.granted){
      Alert.alert("permission required, Access to camera is required")
    }
    const result = await ImagePicker.launchCameraAsync({
      quality:1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container1}>
    <View style={styles.container}>
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", gap:5, marginBottom:10}}>
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
      <View style={{ alignItems: "center" }}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle}/>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
      />
      <TextInput style={[styles.input]} placeholder="Location" value={location} onChangeText={setLocation}/>

      <TouchableOpacity
        style={{
          backgroundColor: "#7c3aed",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={async () => {
          const result = await postMemory(image, title, caption, location)
          if(result) {
            setImage(null)
            setTitle("")
            setCaption("")
            setLocation("")
          }
        }}
      >
        <Text style={{ color: "white" }}> Post </Text>
      </TouchableOpacity>

      <StatusBar barStyle="auto" />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  container1: {
    flex: 1,
    marginBottom: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    marginLeft: 8,
    color: "gray",
  },
  image: {
    width: "100%",
    height: 300,
    margin: 5,
    borderRadius: 10,
  },
});

export default AddPost;
