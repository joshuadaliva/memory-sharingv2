
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'


const createTableFavorites = async () => {
    try{
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS favorites(
                favorite_id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT NOT NULL,
                title TEXT NOT NULL,
                caption TEXT NOT NULL,
                location TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                post_id INTGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES memory_users(user_id)
                FOREIGN KEY(post_id) REFERENCES posts(post_id)
            )   
        `)
    }catch(error){
        console.log(error)
    }
}

const addToFavorite = async (image, title, caption, location,user_id, post_id) => {
    try{
        await createTableFavorites()
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
        Alert.alert("added to favorite!")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default addToFavorite

const styles = StyleSheet.create({})