  import { NavigationContainer, useNavigation } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import SignUp from "./Signup";
  import Login from "./Login";
  import Getstarted from "./Getstarted";
  import Main from "./main";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import Setting from './Tabs/Profile/Setting'
import { LocationsPosted } from "./Tabs/HomeMap/LocationsPosted";
import createDbTable from "./database_actions/createDbTable";
import Notifications from "./Tabs/Notifications";

  const App = () => {
    const [isLogin, setIsLogin] = useState(null)
    const Stack = createNativeStackNavigator()

    useEffect(() => {
      const checkIslogin = async () => {
        const loginStatus = await AsyncStorage.getItem("loginStatus")
        console.log(loginStatus)
        if(loginStatus === "true"){
          setIsLogin(true)
        }
        else{
          setIsLogin(false)
        }
      }
      checkIslogin()
    },[])

    useEffect(() => {
      const initDB = async () => {
        const result = await createDbTable()
        console.log(result)
      }
      initDB()
    },[])

    
    if (isLogin === null) {
      return (
        <ActivityIndicator color={"blue"}/>
      )
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLogin ? "Main" : "start"}>
          <Stack.Screen name="start" component={Getstarted} options={{headerShown : false}} />
          <Stack.Screen name="Signup" component={SignUp} options={{headerShown: false  }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
          <Stack.Screen name="Setting" component={Setting}/>
          <Stack.Screen name="locations" component={LocationsPosted} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  export default App