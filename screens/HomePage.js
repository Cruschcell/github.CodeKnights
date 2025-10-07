import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, TextInput, Modal, ScrollView, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [boardsExpanded, setBoardsExpanded] = useState(false);

  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 300,
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
    console.log('Search:', searchQuery);
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
          <TextInput style={styles.searchInput} placeholder="Search catalog" value={searchQuery} 
          onChangeText={setSearchQuery} placeholderTextColor="#666" onSubmitEditing={handleSearch}/>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to Letran CodeKnights <Text style={styles.usernameText}>John Doe</Text>
        </Text>
        <View style={styles.boardsGrid}>
          {boards.map((board, index) => {
            if (index === 4) {
              return (
                <TouchableOpacity key={board.id} style={[styles.boardCard, styles.boardCardFull]} activeOpacity={0.8}>
                  <Text style={styles.boardCode}>{board.code}</Text>
                  <Text style={styles.boardTitle}>{board.title}</Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity key={board.id} style={styles.boardCard} activeOpacity={0.8}>
                <Text style={styles.boardCode}>{board.code}</Text>
                <Text style={styles.boardTitle}>{board.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.guidelinesSection}>
          <TouchableOpacity style={styles.guidelinesCard} activeOpacity={0.8}>
            <Text style={styles.guidelinesCode}>/Janni/</Text>
            <Text style={styles.guidelinesTitle}>Rules and Regulations</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© 2025 Letran Manila. All rights reserved</Text>
      </ScrollView>

      <Modal visible={menuVisible} transparent={true} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
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
                    <TouchableOpacity key={board.id} style={styles.dropdownItem}>
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
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00205B",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#00205B",
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  hamburgerBun: {
    width: 30,
    height: 3,
    backgroundColor: '#fff',
    marginVertical: 3,
    borderRadius: 2,
  },
  hamburgerPatty: {
    width: 30,
    height: 3,
    backgroundColor: '#fff',
    marginVertical: 3,
    borderRadius: 2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 40,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
  },
  usernameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
  },
  boardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 20,
  },
  boardCard: {
    width: (width - 60) / 2,
    backgroundColor: '#003380',
    borderRadius: 10,
    padding: 20,
    minHeight: 140,
    justifyContent: 'center',
  },
  boardCardFull: {
    width: width - 40,
  },
  boardCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  boardTitle: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
  },
  guidelinesSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  guidelinesCard: {
    backgroundColor: '#003380',
    borderRadius: 10,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
  },
  guidelinesCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  guidelinesTitle: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
  },
  footer: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  menuContainer: {
    backgroundColor: '#fff',
    width: width * 0.75,
    height: '100%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00205B',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#00205B',
    fontWeight: '300',
  },
  menuContent: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 18,
    color: '#00205B',
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#00205B',
  },
  dropdownContent: {
    backgroundColor: '#f5f5f5',
    paddingLeft: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#00205B',
  },
});