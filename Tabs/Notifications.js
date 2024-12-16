import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const user_id = await AsyncStorage.getItem("id");
                const db = await SQLite.openDatabaseAsync("memorySharing");
                const result = await db.getAllAsync("SELECT * FROM notification WHERE user_id = ?", [Number(user_id)]);
                if (result.length === 0) {
                    Alert.alert("No data available");
                    return;
                }
                
                setNotifications(result);
            } catch (error) {
                console.log("Error fetching notifications: ", error);
            }
        };

        fetchNotifications();
    }, [navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Text>{item.title}</Text>
            <Text>{item.created_at}</Text>
        </View>
    );

    return (
        <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.notification_id.toString()}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No notifications available</Text>}
        />
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 90,
    },
    postContainer: {
        backgroundColor: "white",
        borderRadius: 5,
        overflow: "hidden",
        elevation: 2,
        justifyContent:"center",
        flexDirection: "row",
        alignItems: "center",
        padding:20,
        margin:20,
        marginBottom:0,
        marginRight:20
    },
});