import { Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/RegistrationStyle';

const { width } = Dimensions.get("window");

export default function Registration() {
  // useEffect(()=>{
  //   const clearStorage = async () =>{
  //     try{
  //       await AsyncStorage.clear();
  //       console.log('Async cleared')
  //     } catch(e){
  //       console.log('Async not cleared')
  //     }
  //   };
  //   clearStorage();
  // },[]);
  useEffect(() => {
    const seedAdminAccount = async () => {
      try {
        const usersJson = await AsyncStorage.getItem('users');
        const users = usersJson ? JSON.parse(usersJson) : [];

        const adminExists = users.some(user => user.role === 'admin');
        if (!adminExists) {
          const adminUser = {
            id: 'admin-1',
            username: 'Admin',
            email: 'admin@letran.edu.ph',
            password: 'adminpassword123',
            role: 'admin',
            createdAt: new Date().toString(),
          };

          users.push(adminUser);
          await AsyncStorage.setItem('users', JSON.stringify(users));

          console.log('Admin account created:', adminUser);
        } else {
          console.log('Admin already exists.');
        }
      } catch (e) {
        console.log('Error creating admin account:', e);
      }
    };

    seedAdminAccount();
  }, []);
  

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); 

  const validateRegistration = () =>{
    const validations = [
    {condition: !username.trim(), message: 'Please enter a username!'},
    {condition: !email.trim(), message: 'Please enter an email!'},
    {condition: !email.toLowerCase().endsWith("@letran.edu.ph"), message:'Please enter your letran email!'},
    {condition: !password, message: 'Please enter a password!'},
    {condition: password.length< 12, message: 'Password should be at least 12 characters!'},
    {condition: password!==retypePassword, message: 'Password does not match!'},
    {condition: !selectedRole, message: 'Please choose a role!'},
    ];
    for(const v of validations){
      if(v.condition){
        Alert.alert("Invalid Input",v.message)
        return false;
      }
    }
    return true;
  }

  const handleRegister = async () =>{
    if (!validateRegistration()) return;
    try{
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson):[];
      const userExists = existingUsers.find(
        user=>user.username===username||user.email===email
      );
      if(userExists){
        Alert.alert('Username or email already in use!')
        return;
      }
      const newUser={
        id:Date.now().toString(),
        username:username.trim(),
        email:email.trim(),
        password:password, //will use bcrypt maybe
        role:selectedRole,
        createdAt: new Date().toString(),
      };
      existingUsers.push(newUser);
      await AsyncStorage.setItem('users',JSON.stringify(existingUsers));
      Alert.alert(
        'Registration successfull',
        'You can now login using your credentials. Enjoy',
        [
          {
            //we clear the stuff
            text:'ok',
            onPress:()=>{
              setUsername("");
              setEmail("");
              setPassword("");
              setRetypePassword("");
              setSelectedRole("");
            }
          }
        ]
      );
      console.log('User has been registered', newUser);
    }catch(e){
      console.log('User registration failed', e)
      Alert.alert('Error','Failed to register, please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topPart}>
        <Text style={styles.topText}>Registration</Text>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="#000"
          autoCorrect={false}/>
          {username.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setUsername("")}>
              <Text style={styles.clearButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Letran Email" value={email} onChangeText={setEmail} 
          placeholderTextColor="#000" keyboardType="email-address" autoCapitalize="none" autoCorrect={false}/>
          {email.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setEmail("")}>
              <Text style={styles.clearButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Password" value={password}
            onChangeText={setPassword} secureTextEntry={true} placeholderTextColor="#000"/>
          {password.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setPassword("")}>
              <Text style={styles.clearButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Retype Password" value={retypePassword}
            onChangeText={setRetypePassword} secureTextEntry={true} placeholderTextColor="#000"/>
          {retypePassword.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setRetypePassword("")}>
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
          <Text style={styles.registerAsText}>Register As:</Text>
          
          <View style={styles.roleButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selectedRole === "student" && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole("student")} activeOpacity={0.8}>
              <Text style={styles.roleButtonText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                selectedRole === "tutor" && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole("tutor")} activeOpacity={0.8}>
              <Text style={styles.roleButtonText}>Tutor</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.registerButtonText}>Register →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
