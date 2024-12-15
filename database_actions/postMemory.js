
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'


const createTablePosts = async () => {
    try{
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS posts(
                post_id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT NOT NULL,
                title TEXT NOT NULL,
                caption TEXT NOT NULL,
                location TEXT NOT NULL,
                user_id INTEGER NO NULL,
                FOREIGN KEY(user_id) REFERENCES memory_users(user_id)
            )   
        `)
    }catch(error){
        console.log(error)
    }
}

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
        await createTablePosts()
        if(!image || !title || !caption || !location){
            Alert.alert("provide all fields")
            return false;
        }
        const user_id = await getUserID()
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.runAsync("INSERT INTO posts(image, title,caption,location,user_id) VALUES (?,?,?,?,?)", [image,title,caption,location,user_id])
        Alert.alert("posted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default postMemory

const styles = StyleSheet.create({})