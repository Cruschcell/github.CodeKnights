import * as React from 'react';
import {useState, useEffect} from 'react';
import{ NavigationContainer} from "@react-navigation/native";
import{ createNativeStackNavigator} from "@react-navigation/native-stack";
import Board from "./screens/Board";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Registration from "./screens/Registration";
import Thread from "./screens/Thread";
import Rule from "./screens/Rule";
import WelcomePage from "./screens/WelcomePage";
import AddThread from "./screens/AddThread";
import SearchResult from "./screens/SearchResult"
// import AdminThread from "./screens/AdminThread";
// import AdminPanel from "./screens/AdminPanel";
// import AdminBoard from "./screens/AdminBoard";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator,View} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App(){
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  const[isLoading,setIsLoading] = useState(true);
  useEffect(()=>{
    checkLoginStatus();
  },[]);

  const checkLoginStatus = async () =>{
    try{
      const currentUserJson = await AsyncStorage.getItem('currentUser');
      if(currentUserJson){
        const currentUser = JSON.parse(currentUserJson);
        setIsLoggedIn(currentUser.isLoggedIn===true);
      }
      else{
        setIsLoggedIn(false);
      }
    }catch(e){
      console.log('Error checking login status',e);
      setIsLoggedIn(false);
    }finally{
      setIsLoading(false);
    }
  };
  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#00205B"/>
      </View>
    );
  }

  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "HomePage" : "WelcomePage"}>
          <Stack.Screen name="Board" component={Board} options={{headerShown:false}}/>
          <Stack.Screen name="HomePage" component={HomePage} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}}/>
          <Stack.Screen name="Thread" component={Thread} options={{headerShown:false}}/>
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
          <Stack.Screen name="Rule" component={Rule} options ={{headerShown:false}}/>
          <Stack.Screen name="AddThread" component={AddThread} options={{headerShown:false}}/>
          <Stack.Screen name="SearchResult" component={SearchResult} options={{headerShown:false}}/>
          {/* <Stack.Screen name="AdminThread" component={AdminThread} options={{headerShown:false}}/>
          <Stack.Screen name="AdminPanel" component={AdminPanel} options={{headerShown:false}}/>
          <Stack.Screen name="AdminBoard" component={AdminBoard} options={{headerShown:false}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}