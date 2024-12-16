
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'


const getUserID = async () => {
    try{
        const user_id = await AsyncStorage.getItem("id")
        return Number(user_id)
    }catch(error){
        console.log(error)
    }
}

const postMemory = async (image, title, caption, location) => {
    try{
        if(!image || !title || !caption || !location){
            Alert.alert("provide all fields")
            return false;
        }
        const user_id = await getUserID()
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.runAsync("INSERT INTO posts(image, title,caption,location,user_id) VALUES (?,?,?,?,?)", [image,title,caption,location,user_id])
        const date = new Date().toLocaleTimeString()
        const time = new Date().toLocaleDateString()
        const today = date.toString() + " " + time.toString()
        await db.runAsync("INSERT INTO notification(title, created_at, user_id) VALUES (?,?,?)", ["you posted on ", today,user_id])
        Alert.alert("posted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default postMemory

const styles = StyleSheet.create({})