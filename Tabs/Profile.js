import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Bell,
  Lock,
  LogOut,
  Settings,
  UserCheck,
  UserX,
} from "lucide-react-native";

const Profile = () => {
  const isActive = true;
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image
          source={require("../assets/me.png")}
          style={styles.profileImage}
          resizeMode="cover"
        />

        <Text style={styles.username}>Joshua Daliva</Text>

        <View style={styles.statusContainer}>
          {isActive ? (
            <UserCheck color="green" size={24} />
          ) : (
            <UserX color="red" size={24} />
          )}
          <Text
            style={[styles.statusText, { color: isActive ? "green" : "red" }]}
          >
            {isActive ? "Active" : "Inactive"}
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingButton}>
            <Settings color="#7c3aed" size={24} />
            <Text style={styles.buttonText}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Lock color="#7c3aed" size={24} />
            <Text style={styles.buttonText}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Bell color="#7c3aed" size={24} />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingButton,
              { backgroundColor: "#F43F5E", marginTop: 30 },
            ]}
          >
            <LogOut color="white" size={24} />
            <Text style={{ color: "white", marginLeft: 10 }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  container1: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 8,
  },
  settingsContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    marginTop: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Profile;
