
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage';



const login = async (email,password) => {
    try{
        if(!email || !password){
            Alert.alert("provide all fields")
            return false;
        }
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const result  = await db.getFirstAsync("SELECT * FROM memory_users WHERE email = ? AND password = ?", [email, password]);
        if(!result){    
            Alert.alert("username or password is incorrect")
            return false;
        }
        console.log(result)
        AsyncStorage.setItem("id", result.id.toString())
        AsyncStorage.setItem("username", result.username)
        AsyncStorage.setItem("email", result.email)
        AsyncStorage.setItem("loginStatus", "true")
        Alert.alert("Login sucessful")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default login
