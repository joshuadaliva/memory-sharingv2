
import { Alert, StyleSheet} from 'react-native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'


const validateEmail = (email) => {
    const emailSchema = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailSchema.test(email);
  };


const updateInfo = async (image, username, email) => {
    try{
        if(!image || !username || !email){
            Alert.alert("provide all fields")
            return false;
        }
        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email")
            return false;
        }
        const user_id = await AsyncStorage.getItem("id")
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const checkIfExists = await db.getFirstAsync("SELECT * FROM memory_users WHERE email = ? ",[email])
        if(checkIfExists){
            Alert.alert("please use different email")
            return
        }
        await db.runAsync("UPDATE memory_users SET username = ? , email = ?, profile_pic = ? WHERE user_id = ?", [username, email, image, user_id])
        const info = await db.getFirstAsync("SELECT * FROM memory_users WHERE user_id = ? ",[user_id])
        AsyncStorage.setItem("id", info.user_id.toString())
        AsyncStorage.setItem("username", info.username)
        AsyncStorage.setItem("email", info.email)
        AsyncStorage.setItem("image", info.profile_pic)
        Alert.alert("information updated succesfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

const updatePassword = async (password, newPassword, new2Password) => {
    try{
        if(!password || !newPassword || !new2Password){
            Alert.alert("provide all fields")
            return false;
        }
        if(newPassword !== new2Password){
            Alert.alert("newpassword does not match")
            return
        }
        const user_id = await AsyncStorage.getItem("id")
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const result = await db.runAsync("UPDATE memory_users SET password = ? WHERE password = ? AND user_id = ?", [newPassword, password, Number(user_id)])
        if(result.changes === 0){
            Alert.alert("password is incorrect")
            return
        }
        Alert.alert("password updated succesfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export {updateInfo, updatePassword}

const styles = StyleSheet.create({})