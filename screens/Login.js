import { Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/LoginStyle';

const { width } = Dimensions.get("window");

export default function Login({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if(!username.trim() || !password){
      Alert.alert('Please enter both username/email and password!');
      return;
    }
    try{
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson):[];
      const inputValue = username.trim().toLowerCase();

      const user = users.find(u=>{
        const matchUsername = u.username.toLowerCase()===inputValue;
        const matchEmail = u.email.toLowerCase()===inputValue;
        const matchPassword = u.password === password;

        return (matchUsername || matchEmail) && matchPassword;
      });
      if(user){
        if(user.banned){
          Alert.alert('Account banned', 'Your account has been banned by an administrator')
          return;
        }
        // const loginData = {
        //   isLoggedIn: true,
        //   userId: user,
        //   username: user.username,
        //   email: user.email,
        //   role: user.role,
        //   loginTime: new Date().toISOString()
        // };
        await AsyncStorage.setItem('currentUser',JSON.stringify({isLoggedIn:true,...user}));
        Alert.alert('Login Successful', `Welcome back , ${user.username}`,[
          {text: 'ok', onPress:()=>navigation.replace('HomePage')}
        ]);
       }else{
          Alert.alert('Login Fialed', 'Invalid Username/email or password');
        }
      }catch(e){
        console.log('Login error', e)
        Alert.alert('Error','Failed to login, try again')
      }
    }
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topPart}>
        <Text style={styles.topText}>Login</Text>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Letran Email or Username" value={username}
            onChangeText={setUsername} placeholderTextColor="#000"/>
          {username.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setUsername("")}>
              <Text style={styles.clearButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword}
            secureTextEntry={true} placeholderTextColor="#000"/>
          {password.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setPassword("")}>
              <Text style={styles.clearButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bottomPart}>
        <View style={styles.curve}>
          <Svg height="200" width={width} style={styles.svg}>
            <Ellipse cx={width / 2} cy="100" rx={width * 0.98} ry="100" fill="#C8102E" />
            <Ellipse cx={width / 2} cy="113" rx={width * 0.95} ry="100" fill="#00205B" />
          </Svg>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Proceed →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
};
