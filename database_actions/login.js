
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
        const result  = await db.getAllAsync("SELECT * FROM memory_users WHERE email = ? AND password = ?", [email, password]);
        if(result.length === 0){    
            Alert.alert("user not found")
            return false;
        }
        console.log(result)
        Alert.alert("user found")
        return true;
    }catch(error){
        console.log(error.message)
    }
}

export default login
