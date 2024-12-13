import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { PlusCircle, MapPin } from "lucide-react-native";

const AddPost = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton}>
        <PlusCircle size={24} color="gray" />
        <Text style={styles.buttonText}>Add Images</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Title" />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Caption"
      />
      <TouchableOpacity style={styles.locationButton}>
        <MapPin size={24} color="gray" />
        <Text style={styles.buttonText}> 'Add Location'</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#7c3aed",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}> Post </Text>
      </TouchableOpacity>

      <StatusBar barStyle="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    marginBottom: 70,
  },
  buttonText: {
    marginLeft: 8,
    color: "gray",
  },
});

export default AddPost;
