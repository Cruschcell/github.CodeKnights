import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Ellipse } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  registerAsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  roleButton: {
    backgroundColor: "#4EA5E4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: "#4EA5E4",
    borderWidth:3,
    borderColor:'#fff',
  },
  roleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '600',
  },
  registerButton: {
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
  registerButtonText: {
    color: "#00205B",
    fontSize: 20,
    fontWeight: '600',
  },
});