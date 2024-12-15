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
        await db.runAsync("DELETE FROM Favorites WHERE favorite_id = ?", [post_id])
        Alert.alert("deleted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}


const deleteFavorite = async (favorite_id) => {
    try{
        if(!favorite_id){
            Alert.alert("favorite id is empty")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.runAsync("DELETE FROM Favorites WHERE favorite_id = ?", [favorite_id])
        Alert.alert("deleted successfully")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export {deleteMemory, deleteFavorite}


