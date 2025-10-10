import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Animated, Dimensions, Alert } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/RuleStyle';
const { width } = Dimensions.get("window");


export default function Rule({navigation}) {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [boardsExpanded, setBoardsExpanded] = useState(false);
  
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
  const navigateToBoardFromMenu = (board)=>{
    closeMenu();
    navigation.navigate('Board',{
      boardId:board.id,
      boardCode:board.code,
      boardTitle:board.title
    });
  };

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
        setUser(user)
      }
    }catch(e){
      console.log("Error getting current user",e);
    }
  };
  
  useEffect(()=>{
      getCurrentUser()
    },[]);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburgerButton} onPress={() => setMenuVisible(true)}>
          <View style={styles.hamburgerBun} />
          <View style={styles.hamburgerPatty} />
          <View style={styles.hamburgerBun} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search catalog" value={searchQuery} 
            onChangeText={setSearchQuery} placeholderTextColor="#666" onSubmitEditing={handleSearch}/>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

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
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HomePage')}>
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
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
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Guidelines</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
        
      <ScrollView style={styles.content}>
        <Text style={styles.ruleHeader}>Rules</Text>
        <Text style={styles.ruleText}>
          1. No bullying or harrassment. Any form of disrespect,
          insult, or targeted attack will result in a permaban.
        </Text>
        <Text style={styles.ruleText}>
          2. Stay on topic. Keep discussions related to the thread.
          Derailing a thread may lead to a temporary suspension.
        </Text>
        <Text style={styles.ruleText}>
          3. Keep discussions academic. This forum is strictly for
          academic help and discussions.
        </Text>
        <Text style={styles.ruleText}>
          4. Use proper language. Avoid profanity, hate speech, or 
          inappropriate content.
        </Text>
        <Text style={styles.ruleText}>
          5. No spam. Repeated or irrelevant posts will be removed.
        </Text>
        <Text style={styles.ruleText}>
          6. Use clear titles. When starting a thread, write descriptive
          titles.
        </Text>
        <Text style={styles.ruleText}>
          7. Respect privacy. Do not share personal info of yourself
          and others publicly.
        </Text>
        <Text style={styles.ruleText}>
          8. Admins are cucks
        </Text>
      </ScrollView>     
    </SafeAreaView>
  )
}
