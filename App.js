import * as React from 'react';
import{ NavigationContainer} from "@react-navigation/native";
import{ createNativeStackNavigator} from "@react-navigation/native-stack";
import Board from "./screens/Board";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Registration from "./screens/Registration";
import Thread from "./screens/Thread";
import WelcomePage from "./screens/WelcomePage";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage">
          <Stack.Screen name="Board" component={Board} options={{headerShown:false}}/>
          <Stack.Screen name="HomePage" component={HomePage} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}}/>
          <Stack.Screen name="Thread" component={Thread} options={{headerShown:false}}/>
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}