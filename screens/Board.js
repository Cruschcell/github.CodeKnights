import { Text, View, TouchableOpacity, Dimensions, TextInput, Modal, ScrollView, Animated, Alert, FlatList, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/BoardStyle';


const {width} = Dimensions.get("window");

export default function Board({ navigation, route }) {
  const { boardId, boardCode, boardTitle } = route.params;
  
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [boardsExpanded, setBoardsExpanded] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortBy, setSortBy] = useState('Recent');
  const [adminMenuVisible, setAdminMenuVisible] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const handleCloseThread = async (thread) => {
  if (!thread) return;
  Alert.alert(
    'Close Thread',
    'Are you sure you wanna close the thread',
    [
      {text:'Cancel',style:'cancel'},
      {
        text:'Yes',style:'destructive',
        onPress:async()=>{
          try {
            const updatedThreads = threads.map(t =>
              t.id === thread.id ? { ...t, isClosed: true, status: 'CLOSED' } : t
            );
            setThreads(updatedThreads);
            await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(updatedThreads));
            setAdminMenuVisible(false);
            Alert.alert('Thread Closed', 'The thread has been closed successfully.');
          } catch (e) {
            console.log("Error closing thread", e);
          }
        }
      }
    ]
  )
  
};

  const handleDeleteThread = async (thread) => {
    if (!thread) return;
    Alert.alert(
      'Delete Thread',
      'Are you sure you wanna permanently delete this thread?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const filteredThreads = threads.filter(t => t.id !== thread.id);
              setThreads(filteredThreads);
              await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(filteredThreads));
              setAdminMenuVisible(false);
              Alert.alert('Thread Deleted', 'The thread has been deleted.');
            } catch (e) {
              console.log("Error deleting thread", e);
            }
          },
        },
      ]
    );
  };


  console.log('loaded threads', threads);
  const boards = [
    { id: 1, code: '/Prog/', title: 'Programming and Software Development' },
    { id: 2, code: '/Infra/', title: 'Computer Systems, Hardware & Networking' },
    { id: 3, code: '/Math/', title: 'Foundations & Theory' },
    { id: 4, code: '/Flow/', title: 'Systems Analysis, Design, and Management' },
    { id: 5, code: '/Misc/', title: 'Special Topics & Professional Development' },
  ];
  const getStatusColor = (status) => {
  switch (status) {
    case 'HELP ME PLS':
      return '#ff6b6b';
    case 'BEST ANSWER':
      return '#0daf16ff';
    case 'DISCUSSION':
      return '#4dabf7';
    default:
      return '#8899BB';
  }
};

  const sortOptions = ['Recent', 'Oldest', 'Reply Count Asc', 'Reply Count Desc', 'Last Reply'];

  useEffect(() => {
    getCurrentUser();
    loadThreads();
  }, [boardId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadThreads();
      getCurrentUser();
    });
    return unsubscribe;
  }, [navigation, boardId]);

  const getCurrentUser = async () => {
    try {
      const currentUserJson = await AsyncStorage.getItem('currentUser');
      if (currentUserJson) {
        const userData = JSON.parse(currentUserJson);
        setUser(userData);
      }
    } catch (e) {
      console.log("Error getting current user", e);
    }
  };

  const loadThreads = async () => {
    try {
      const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
      if (threadsJson) {
        const loadedThreads = JSON.parse(threadsJson);
        setThreads(loadedThreads);
      }
       else {
        setThreads([]);
      }
    } catch (e) {
      console.log("Error loading threads", e);
    }
  };

  const getSortedThreads = () => {
    let sorted = [...threads];
    
    switch(sortBy) {
      case 'Recent':
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'Oldest':
        sorted.sort((a, b) => a.createdAt - b.createdAt)
        break;
      case 'Reply Count Asc':
        sorted.sort((a, b) => a.replies - b.replies);
        break;
      case 'Reply Count Desc':
        sorted.sort((a, b) => b.replies - a.replies);
        break;
      case 'Last Reply':
        sorted.sort((a, b) => (b.lastReplyAt || b.createdAt) - (a.lastReplyAt || a.createdAt));
        break;
    }
    
    return sorted;
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you wanna logout?', [{
      text: 'Nah', style: 'cancel'
    }, {
      text: 'Logout', onPress: async () => {
        try {
          await AsyncStorage.removeItem('currentUser');
          navigation.replace('WelcomePage');
        } catch (e) {
          console.log('logout error', e);
          Alert.alert('Error', 'Failed to logout');
        }
      }
    }]);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResult', { 
        query: searchQuery.trim(),
        boards: boards 
      });
    }
  };
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

  const navigateToBoard = (board) => {
    closeMenu();
    navigation.replace('Board', {
      boardId: board.id,
      boardCode: board.code,
      boardTitle: board.title
    });
  };

  const handleNewThread = () => {
    if (!user) {
      Alert.alert('Error', 'Please login to create a thread');
      return;
    }
    navigation.navigate('AddThread', { 
      boardId, 
      boardCode,
      user 
    });
  };

  const handleThreadPress = (thread) => {
    navigation.navigate('Thread', {
      thread,
      boardId,
      boardCode
    });
  };

  const renderThread = ({item}) => (
    <TouchableOpacity 
      style={styles.threadCard} 
      activeOpacity={0.8}
      onPress={() => handleThreadPress(item)}
    >
      <View style={styles.threadHeader}>
        <View style={styles.userAvatar}>
          {item.profileImage ? (
            <Image 
              source={{ uri: item.profileImage }} 
              style={styles.avatarImage}
            />
          ) : (
            <Text style={styles.avatarEmoji}>👤</Text>
          )}
        </View>
        <View style={styles.threadUserInfo}>
          <Text style={styles.threadUsername}>{item.username}</Text>
          <Text style={styles.threadRole}>{item.role}</Text>
        </View>
        {user?.role==='admin'&&(
          <TouchableOpacity onPress={()=>{
            setSelectedThread(item);
            setAdminMenuVisible(true);
          }}
          style={{marginLeft:'auto',padding:5}}>
            <Text style={{fontSize:20,color:"#fff"}}>⋮</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.threadTitle}>{item.title}</Text>
      <Text style={styles.threadPreview} numberOfLines={2}>{item.content}</Text>
      
      <View style={styles.threadFooter}>
        <View style={styles.threadTags}>
          <View style={[styles.threadTag, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.threadTagText}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.threadMeta}>
          <Text style={styles.threadMetaText}>Replies: {item.replies}</Text>
          <Text style={styles.threadMetaText}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boardHeader}>
        <Text style={styles.boardCode}>{boardCode}</Text>
        <Text style={styles.boardTitle}>{boardTitle}</Text>
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortVisible(!sortVisible)}
        >
          <Text style={styles.sortButtonText}>Sort by ▼</Text>
        </TouchableOpacity>
      </View>

      {sortVisible && (
        <View style={styles.sortDropdown}>
          {sortOptions.map((option) => (
            <TouchableOpacity key={option} style={styles.sortOption}
              onPress={() => {
                setSortBy(option);
                setSortVisible(false);
              }}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option && styles.sortOptionSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {threads.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Nothing to see here yet.{'\n'}
            Tap the button below to {'\n'}
            contribute to the community!
          </Text>
        </View>
      ) : (
        <FlatList
          data={getSortedThreads()}
          renderItem={renderThread}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.threadsList}
        />
      )}

      <TouchableOpacity style={styles.newThreadButton} onPress={handleNewThread}>
        <Text style={styles.newThreadButtonText}>New Thread +</Text>
      </TouchableOpacity>

      <Modal visible={menuVisible} transparent={true} animationType="none" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeMenu}>
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuContent}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.navigate('HomePage'); }}>
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.navigate('Profile'); }}>
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => setBoardsExpanded(!boardsExpanded)}>
                <Text style={styles.menuItemText}>Boards</Text>
                <Text style={styles.dropdownIcon}>{boardsExpanded ? '▼' : '▶'}</Text>
              </TouchableOpacity>
              {boardsExpanded && (
                <View style={styles.dropdownContent}>
                  {boards.map((board) => (
                    <TouchableOpacity
                      key={board.id}
                      style={styles.dropdownItem}
                      onPress={() => navigateToBoard(board)}
                    >
                      <Text style={styles.dropdownItemText}>
                        {board.code} - {board.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.navigate('Rule'); }}>
                <Text style={styles.menuItemText}>Guidelines</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={adminMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAdminMenuVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          activeOpacity={1}
          onPressOut={() => setAdminMenuVisible(false)}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              elevation: 5
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Manage Thread
            </Text>

            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => handleCloseThread(selectedThread)}
            >
              <Text style={{ fontSize: 15, color: '#007bff' }}>Close Thread</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => handleDeleteThread(selectedThread)}
            >
              <Text style={{ fontSize: 15, color: 'red' }}>Delete Thread</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => setAdminMenuVisible(false)}
            >
              <Text style={{ fontSize: 15, color: '#333' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}