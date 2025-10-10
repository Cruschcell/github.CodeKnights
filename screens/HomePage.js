import { Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Modal, ScrollView, Animated, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/HomepageStyle'
const { width } = Dimensions.get('window');

export default function Homepage({navigation}) {
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you wanna logout?',[{
      text:'Nah',style:'cancel'
    },
    {
      text:'Logout', onPress: async()=>{
        try{
          await AsyncStorage.removeItem('currentUser');
          navigation.replace('WelcomePage');
        }catch(e){
          console.log('logout error',e);
          Alert.alert('Error','Failed to logout');
        }
      }
    }
  ]);
  };
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

  const[user,setUser]=useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [boardsExpanded, setBoardsExpanded] = useState(false);

  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
      setBoardsExpanded(false);
    });
  };

  const boards = [
    { id: 1, code: '/Prog/', title: 'Programming and Software Development' },
    { id: 2, code: '/Infra/', title: 'Computer Systems, Hardware & Networking' },
    { id: 3, code: '/Math/', title: 'Foundations & Theory' },
    { id: 4, code: '/Flow/', title: 'Systems Analysis, Design, and Management' },
    { id: 5, code: '/Misc/', title: 'Special Topics & Professional Development' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResult', { 
        query: searchQuery.trim(),
        boards: boards 
      });
    }
  };

  const getCurrentUser = async()=>{
    try{
      const currentUserJson=await AsyncStorage.getItem('currentUser');
      if(currentUserJson){
        const user = JSON.parse(currentUserJson);
        console.log('Current user : ', user.username,user.role);
        setUser(user);
      }
    }catch(e){
      console.log("Error getting current user",e);
    }
  };

  useEffect(()=>{
      getCurrentUser()
    },[]);
  
  const navigateToBoard = (board)=>{
    navigation.navigate('Board',{
      boardId:board.id,
      boardCode:board.code,
      boardTitle:board.title
    });
  };

  const navigateToBoardFromMenu = (board)=>{
    closeMenu();
    navigation.navigate('Board',{
      boardId:board.id,
      boardCode:board.code,
      boardTitle:board.title
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburgerButton} onPress={() => setMenuVisible(true)}>
          <View style={styles.hamburgerBun} />
          <View style={styles.hamburgerPatty} />
          <View style={styles.hamburgerBun} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search catalog" 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
            placeholderTextColor="#666" 
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          Welcome to Letran CodeKnights {user && <Text style={styles.usernameText}>{user.username}</Text>}
        </Text>
        <View style={styles.boardsGrid}>
          {boards.map((board, index) => {
            if (index === 4) {
              return (
                <TouchableOpacity key={board.id} style={[styles.boardCard, styles.boardCardFull]} activeOpacity={0.8} onPress={()=>navigateToBoard(board)}>
                  <Text style={styles.boardCode}>{board.code}</Text>
                  <Text style={styles.boardTitle}>{board.title}</Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity key={board.id} style={styles.boardCard} activeOpacity={0.8} onPress={()=>navigateToBoard(board)}>
                <Text style={styles.boardCode}>{board.code}</Text>
                <Text style={styles.boardTitle}>{board.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.guidelinesSection}>
          <TouchableOpacity style={styles.guidelinesCard} activeOpacity={0.8} onPress={()=>navigation.navigate('Rule')}>
            <Text style={styles.guidelinesCode}>/Janni/</Text>
            <Text style={styles.guidelinesTitle}>Rules and Regulations</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© 2025 Drain gang. All rights reserved</Text>
      </ScrollView>

      <Modal visible={menuVisible} transparent={true} animationType="none" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeMenu}>
          <Animated.View style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]} onStartShouldSetResponder={() => true}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuContent}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => setBoardsExpanded(!boardsExpanded)}>
                <Text style={styles.menuItemText}>Boards</Text>
                <Text style={styles.dropdownIcon}>{boardsExpanded ? '▼' : '▶'}</Text>
              </TouchableOpacity>
              {boardsExpanded && (
                <View style={styles.dropdownContent}>
                  {boards.map((board) => (
                    <TouchableOpacity key={board.id} style={styles.dropdownItem} onPress={()=>navigateToBoardFromMenu(board)}>
                      <Text style={styles.dropdownItemText}>
                        {board.code} - {board.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("Rule")}>
                <Text style={styles.menuItemText}>Guidelines</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}