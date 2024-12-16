
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'


const validateEmail = (email) => {
    const emailSchema = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailSchema.test(email);
  };

const addUser = async (username, email,password) => {
    try{
        if(!username || !email || !password){
            Alert.alert("provide all fields")
            return false;
        }
        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email")
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