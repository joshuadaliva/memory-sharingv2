import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite'
import { Alert } from 'react-native';

const deleteMemory = async (post_id) => {
    try{
        if(!post_id){
            Alert.alert("post id is empty")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.runAsync("DELETE FROM posts WHERE post_id = ?", [post_id])
        await db.runAsync("DELETE FROM Favorites WHERE post_id = ?", [post_id])
        const user_id = await AsyncStorage.getItem("id")
        const date = new Date().toLocaleTimeString()
        const time = new Date().toLocaleDateString()
        const today = date.toString() + " " + time.toString()
        await db.runAsync("INSERT INTO notification(title, created_at, user_id) VALUES (?,?,?)", ["you deleted post on ", today,user_id])
        Alert.alert("deleted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}


const deleteFavorite = async (post_id) => {
    try{
        if(!post_id){
            Alert.alert("favorite id is empty")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.runAsync("DELETE FROM Favorites WHERE post_id = ?", [post_id])
        const user_id = await AsyncStorage.getItem("id")
        const date = new Date().toLocaleTimeString()
        const time = new Date().toLocaleDateString()
        const today = date.toString() + " " + time.toString()
        await db.runAsync("INSERT INTO notification(title, created_at, user_id) VALUES (?,?,?)", ["you deleted favorite on ", today,user_id])
        Alert.alert("deleted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export {deleteMemory, deleteFavorite}


