import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {StyleSheet, View ,Text, FlatList, StatusBar, Image, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite'
import { getLocation } from './LocationsPosted';



const HomeMap = ({navigation}) => {

  const [place, setPlaces] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      try{
        const user_id = await AsyncStorage.getItem("id")
        const db = await SQLite.openDatabaseAsync("memorySharing")
        const result = await db.getAllAsync("SELECT DISTINCT location FROM posts WHERE user_id = ?", [Number(user_id)])
        setPlaces(result)
      }catch(error){
        console.log(error)
      }
    }
    fetchPlaces()
  },[navigation,place])


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      getLocation(item.location)
      navigation.navigate("locations")
    }}>
      <View style={styles.containerLocation}>
        <Text style={{fontSize:20}}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  if(place.length === 0){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:"red", textAlign:"center", fontWeight:"bold"}}>NO Visited Place YET TRY TO MAKE ONE</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={place}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:20
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  containerLocation:{
    padding:10,
    backgroundColor:"white",
    borderRadius:10,
    margin:20,
    marginBottom:0
  }
});

export default HomeMap;


