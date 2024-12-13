
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'


const createTableUsers = async () => {
    try{
        const db = await SQLite.openDatabaseAsync("memorySharing")
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS memory_users(
                user_id INTEGER AUTOINCREMENT PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )   
        `)
    }catch(error){
        console.log(error)
    }
}

const addUser = async (username, email,password, isSignedUp) => {
    try{
        await createTableUsers()
        if(!username || !email || !password){
            Alert.alert("provide all fields")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const existingUser  = await db.getFirstAsync("SELECT * FROM memory_users WHERE email = ?", [email]);
        if (existingUser) {
            Alert.alert("Email already in use. Please use a different email.");
            return false;
        }
        await db.runAsync("INSERT INTO memory_users(username, email,password) VALUES (?,?,?)", [username, email, password])
        Alert.alert("user created")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default addUser

const styles = StyleSheet.create({})