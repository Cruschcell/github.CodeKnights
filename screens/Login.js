import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        const loginData = {
          isLoggedIn: true,
          userId: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          loginTime: new Date().toISOString()
        };
        await AsyncStorage.setItem('currentUser',JSON.stringify(loginData));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topPart: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  topText: {
    fontSize: 40,
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#DFDFDF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    paddingRight: 50,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#49454F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 10,
  },
  bottomPart: {
    flex: 1,
    backgroundColor: "#00205B",
    position: 'relative',
    marginBottom: -40,
  },
  curve: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 200,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0.5,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  loginButtonText: {
    color: "#00205B",
    fontSize: 20,
    fontWeight: '600',
  },
});