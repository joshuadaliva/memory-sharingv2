
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'


const addToFavorite = async (image, title, caption, location,user_id, post_id) => {
    try{
        if(!image || !title || !caption || !location || !user_id || !post_id){
            Alert.alert("use info is empty")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const checkIfExist = await db.getFirstAsync("SELECT * FROM Favorites where post_id = ?", [post_id])
        if(checkIfExist){
            Alert.alert("already added to favorites")
            return false
        }
        await db.runAsync("INSERT INTO favorites(image, title,caption,location,user_id,post_id) VALUES (?,?,?,?,?,?)", [image,title,caption,location,user_id,post_id])
        const date = new Date().toLocaleTimeString()
        const time = new Date().toLocaleDateString()
        const today = date.toString() + " " + time.toString()
        await db.runAsync("INSERT INTO notification(title, created_at, user_id) VALUES (?,?,?)", ["you added post to favorites on ", today,user_id])
        Alert.alert("added to favorite!")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default addToFavorite

const styles = StyleSheet.create({})