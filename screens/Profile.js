import { Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Animated, Dimensions, Alert, Image, RefreshControl } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/ProfileStyle';
const {width} = Dimensions.get("window");


export default function Profile({navigation}) {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [boardsExpanded, setBoardsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Threads');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [bio, setBio] = useState('');
  const [editBioModal, setEditBioModal] = useState(false);
  const [tempBio, setTempBio] = useState('');
  const [userThreads, setUserThreads] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [allThreads, setAllThreads] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);
  
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
        const userData = JSON.parse(currentUserJson);
        console.log('Current user : ', userData.username, userData.role, userData.id);
        setUser(userData);
        
        const savedProfileImage = await AsyncStorage.getItem(`profileImage_${userData.username}`);
        if(savedProfileImage) setProfileImage(savedProfileImage);
        
        const savedCoverImage = await AsyncStorage.getItem(`coverImage_${userData.username}`);
        if(savedCoverImage) setCoverImage(savedCoverImage);
        
        const savedBio = await AsyncStorage.getItem(`bio_${userData.username}`);
        if(savedBio) setBio(savedBio);
        
        await loadUserContent(userData);
      }
    }catch(e){
      console.log("Error getting current user",e);
    }
  };

  const loadUserContent = async (userData) => {
  try {
    const boards = [
      { id: 1, code: '/Prog/' },
      { id: 2, code: '/Infra/' },
      { id: 3, code: '/Math/' },
      { id: 4, code: '/Flow/' },
      { id: 5, code: '/Misc/' },
    ];

    const allThreadsTemp = [];
    const userThreadsTemp = [];

    console.log('=== Loading content for user ===');
    console.log('User ID:', userData.id, 'Type:', typeof userData.id);
    console.log('Username:', userData.username);

    for (const board of boards) {
      const threadsJson = await AsyncStorage.getItem(`threads_${board.id}`);
      if (threadsJson) {
        const threads = JSON.parse(threadsJson);
        
        console.log(`\n--- Board ${board.code} ---`);
        console.log(`Total threads: ${threads.length}`);
        
        threads.forEach(thread => {
          console.log(`Thread: "${thread.title}"`);
          console.log(`  - Thread userId: "${thread.userId}" (${typeof thread.userId})`);
          console.log(`  - Current user ID: "${userData.id}" (${typeof userData.id})`);
          console.log(`  - Match: ${String(thread.userId) === String(userData.id)}`);
        });
        
        const threadsWithBoard = threads.map(thread => ({ 
          ...thread, 
          boardCode: board.code, 
          boardId: board.id 
        }));
        allThreadsTemp.push(...threadsWithBoard);
        
        const userBoardThreads = threads
          .filter(thread => {
            const threadUserId = String(thread.userId).trim();
            const currentUserId = String(userData.id).trim();
            return threadUserId === currentUserId;
          })
          .map(thread => ({ ...thread, boardCode: board.code, boardId: board.id }));
        
        console.log(`User threads in this board: ${userBoardThreads.length}`);
        userThreadsTemp.push(...userBoardThreads);
      }
    }

    allThreadsTemp.sort((a, b) => b.createdAt - a.createdAt);
    userThreadsTemp.sort((a, b) => b.createdAt - a.createdAt);
    
    setAllThreads(allThreadsTemp);
    setUserThreads(userThreadsTemp);

    console.log('\n=== Thread Summary ===');
    console.log('Total threads:', allThreadsTemp.length);
    console.log('User threads:', userThreadsTemp.length);

    const allReplies = [];
    for (const thread of allThreadsTemp) {
      const repliesJson = await AsyncStorage.getItem(`replies_${thread.id}`);
      if (repliesJson) {
        const replies = JSON.parse(repliesJson);
        
        console.log(`\n--- Replies for thread "${thread.title}" ---`);
        console.log(`Total replies: ${replies.length}`);
        
        replies.forEach(reply => {
          console.log(`Reply ID: ${reply.id}`);
          console.log(`  - Reply userId: "${reply.userId}" (${typeof reply.userId})`);
          console.log(`  - Current user ID: "${userData.id}" (${typeof userData.id})`);
          console.log(`  - Match: ${String(reply.userId) === String(userData.id)}`);
        });
        
        const userThreadReplies = replies
          .filter(reply => {
            const replyUserId = String(reply.userId).trim();
            const currentUserId = String(userData.id).trim();
            return replyUserId === currentUserId;
          })
          .map(reply => ({ 
            ...reply, 
            threadTitle: thread.title,
            threadId: thread.id,
            boardCode: thread.boardCode,
            boardId: thread.boardId
          }));
        
        console.log(`User replies in this thread: ${userThreadReplies.length}`);
        allReplies.push(...userThreadReplies);
      }
    }

    allReplies.sort((a, b) => b.createdAt - a.createdAt);
    setUserReplies(allReplies);
    
    console.log('\n=== Final Summary ===');
    console.log('User threads:', userThreadsTemp.length);
    console.log('User replies:', allReplies.length);
    console.log('=====================\n');

  } catch (error) {
    console.log('Error loading user content:', error);
  }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getCurrentUser();
    setRefreshing(false);
  };
  
  useEffect(()=>{
      getCurrentUser()
    },[]);

  const pickImage = async (type) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets[0] && user) {
        const imageUri = response.assets[0].uri;
        
        if (type === 'profile') {
          setProfileImage(imageUri);
          await AsyncStorage.setItem(`profileImage_${user.username}`, imageUri);
          
          // CRITICAL: Update currentUser object with profile image
          const updatedUser = { ...user, profileImage: imageUri };
          setUser(updatedUser);
          await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
          // Also update the users array
          const usersJson = await AsyncStorage.getItem('users');
          if (usersJson) {
            const users = JSON.parse(usersJson);
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
              users[userIndex].profileImage = imageUri;
              await AsyncStorage.setItem('users', JSON.stringify(users));
            }
          }
          
          console.log('Profile image updated:', imageUri);
        } else {
          setCoverImage(imageUri);
          await AsyncStorage.setItem(`coverImage_${user.username}`, imageUri);
        }
      }
    });
  };

  const handleSaveBio = async () => {
    if (tempBio.length > 300) {
      Alert.alert('Bio too long', 'Bio must be 300 characters or less');
      return;
    }
    
    if (user) {
      setBio(tempBio);
      await AsyncStorage.setItem(`bio_${user.username}`, tempBio);
      setEditBioModal(false);
    }
  };

  const openEditBioModal = () => {
    setTempBio(bio);
    setEditBioModal(true);
  };

  const navigateToThread = (threadOrReply) => {
    let threadToNavigate;
    if (threadOrReply.threadId) {
      threadToNavigate = allThreads.find(t => t.id === threadOrReply.threadId);
    } else {
      threadToNavigate = threadOrReply;
    }

    if (threadToNavigate) {
      navigation.navigate('Thread', {
        thread: threadToNavigate,
        boardId: threadToNavigate.boardId,
        boardCode: threadToNavigate.boardCode
      });
    }
  };

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

      <Modal visible={editBioModal} transparent={true} animationType="fade" onRequestClose={() => setEditBioModal(false)}>
        <View style={styles.bioModalOverlay}>
          <View style={styles.bioModalContainer}>
            <Text style={styles.bioModalTitle}>Edit Bio</Text>
            <TextInput
              style={styles.bioInput}
              placeholder="Put some random shit here..."
              value={tempBio}
              onChangeText={setTempBio}
              maxLength={300}
              multiline
              placeholderTextColor="#999"
            />
            <Text style={styles.characterCount}>{tempBio.length}/300</Text>
            <View style={styles.bioModalButtons}>
              <TouchableOpacity style={styles.bioModalCancel} onPress={() => setEditBioModal(false)}>
                <Text style={styles.bioModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bioModalSave} onPress={handleSaveBio}>
                <Text style={styles.bioModalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4dee55ff" />
        }
      >
        <View style={styles.headerSection}>
          <TouchableOpacity style={styles.coverImageContainer} onPress={() => pickImage('cover')}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
              <View style={styles.coverImagePlaceholder}>
                <Text style={styles.coverImageText}>Add cover image</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={() => pickImage('profile')}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarEmoji}>👤</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user?.username || 'John Doe'}</Text>
              <Text style={styles.userRole}>{user?.role || 'Student'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Threads' && styles.activeTab]}
            onPress={() => setActiveTab('Threads')}
          >
            <Text style={[styles.tabText, activeTab === 'Threads' && styles.activeTabText]}>
              Threads ({userThreads.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Replies' && styles.activeTab]}
            onPress={() => setActiveTab('Replies')}
          >
            <Text style={[styles.tabText, activeTab === 'Replies' && styles.activeTabText]}>
              Replies ({userReplies.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'About' && styles.activeTab]}
            onPress={() => setActiveTab('About')}
          >
            <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContent}>
          {activeTab === 'Threads' && (
            <View>
              {userThreads.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No threads yet</Text>
                </View>
              ) : (
                userThreads.map((thread) => (
                  <TouchableOpacity 
                    key={thread.id} 
                    style={styles.threadCard}
                    onPress={() => navigateToThread(thread)}
                  >
                    <View style={styles.threadCardHeader}>
                      <Text style={styles.threadBoardCode}>{thread.boardCode}</Text>
                      <Text style={styles.threadDate}>{thread.date}</Text>
                    </View>
                    <Text style={styles.threadCardTitle} numberOfLines={2}>
                      {thread.title}
                    </Text>
                    <Text style={styles.threadCardContent} numberOfLines={2}>
                      {thread.content}
                    </Text>
                    <View style={styles.threadCardFooter}>
                      <View style={[styles.threadStatus, { backgroundColor: getStatusColor(thread.status) }]}>
                        <Text style={styles.threadStatusText}>{thread.status}</Text>
                      </View>
                      <Text style={styles.threadReplies}>replies: {thread.replies}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
          
          {activeTab === 'Replies' && (
            <View>
              {userReplies.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No replies yet</Text>
                </View>
              ) : (
                userReplies.map((reply) => (
                  <TouchableOpacity 
                    key={reply.id} 
                    style={styles.replyCard}
                    onPress={() => navigateToThread(reply)}
                  >
                    <View style={styles.replyCardHeader}>
                      <Text style={styles.replyBoardCode}>{reply.boardCode}</Text>
                      <Text style={styles.replyDate}>{reply.date}</Text>
                    </View>
                    <Text style={styles.replyThreadTitle} numberOfLines={1}>
                      Re: {reply.threadTitle}
                    </Text>
                    <Text style={styles.replyCardContent} numberOfLines={3}>
                      {reply.content}
                    </Text>
                    {reply.attachments && reply.attachments.length > 0 && (
                      <View style={styles.replyAttachments}>
                        <Text style={styles.replyAttachmentsText}>
                          📎 {reply.attachments.length} attachment{reply.attachments.length > 1 ? 's' : ''}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
          
          {activeTab === 'About' && (
            <View style={styles.aboutSection}>
              <View style={styles.aboutItem}>
                <View style={styles.aboutItemHeader}>
                  <Text style={styles.aboutLabel}>Bio</Text>
                  <TouchableOpacity onPress={openEditBioModal}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.aboutValue}>
                  {bio || 'No bio yet. Tap edit to add one!'}
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Username</Text>
                <Text style={styles.aboutValue}>{user?.username || 'John Doe'}</Text>
              </View>

              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Role</Text>
                <Text style={styles.aboutValue}>{user?.role || 'Student'}</Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userThreads.length}</Text>
                  <Text style={styles.statLabel}>Threads</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userReplies.length}</Text>
                  <Text style={styles.statLabel}>Replies</Text>
                </View>
              </View>

              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Member since</Text>
                <Text style={styles.aboutValue}>October 2025</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>     
    </SafeAreaView>
  )
}