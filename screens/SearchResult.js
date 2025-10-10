import { Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SearchResultStyle'

export default function SearchResult({navigation, route}) {
  const { query, boards } = route.params;
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState({
    boards: [],
    threads: [],
    replies: [],
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    performSearch(query);
  }, []);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const lowerQuery = searchTerm.toLowerCase().trim();
      
      const matchingBoards = boards.filter(board => 
        board.code.toLowerCase().includes(lowerQuery) ||
        board.title.toLowerCase().includes(lowerQuery)
      );

      let allThreads = [];
      for (const board of boards) {
        try {
          const threadsData = await AsyncStorage.getItem(`threads_${board.id}`);
          if (threadsData) {
            const boardThreads = JSON.parse(threadsData);
            const threadsWithBoard = boardThreads.map(thread => ({
              ...thread,
              boardId: board.id
            }));
            allThreads = [...allThreads, ...threadsWithBoard];
          }
        } catch (e) {
          console.log(`Error loading threads for board ${board.id}:`, e);
        }
      }

      const matchingThreads = allThreads.filter(thread =>
        thread.title?.toLowerCase().includes(lowerQuery) ||
        thread.content?.toLowerCase().includes(lowerQuery) ||
        thread.username?.toLowerCase().includes(lowerQuery)
      );

      const repliesData = await AsyncStorage.getItem('replies');
      const replies = repliesData ? JSON.parse(repliesData) : [];
      const matchingReplies = replies.filter(reply =>
        reply.content?.toLowerCase().includes(lowerQuery) ||
        reply.author?.toLowerCase().includes(lowerQuery)
      );

      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const matchingUsers = users.filter(user =>
        user.username?.toLowerCase().includes(lowerQuery) ||
        user.email?.toLowerCase().includes(lowerQuery)
      );

      setResults({
        boards: matchingBoards,
        threads: matchingThreads,
        replies: matchingReplies,
        users: matchingUsers
      });
    } catch (e) {
      console.log('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const navigateToBoard = (board) => {
    navigation.navigate('Board', {
      boardId: board.id,
      boardCode: board.code,
      boardTitle: board.title
    });
  };

  const navigateToThread = (thread) => {
    const board = boards.find(b => b.id === thread.boardId);
    if (board) {
      navigation.navigate('Thread', {
        thread: thread,
        boardId: board.id,
        boardCode: board.code
      });
    }
  };

  const getTotalResults = () => {
    return results.boards.length + results.threads.length + 
           results.replies.length + results.users.length;
  };

  const getFilteredResults = () => {
    switch(activeFilter) {
      case 'boards':
        return { boards: results.boards, threads: [], replies: [], users: [] };
      case 'threads':
        return { boards: [], threads: results.threads, replies: [], users: [] };
      case 'replies':
        return { boards: [], threads: [], replies: results.replies, users: [] };
      case 'users':
        return { boards: [], threads: [], replies: [], users: results.users };
      default:
        return results;
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

  const filteredResults = getFilteredResults();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
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
            autoFocus={false}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'all' && styles.filterButtonTextActive]}>
              All ({getTotalResults()})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'boards' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('boards')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'boards' && styles.filterButtonTextActive]}>
              Boards ({results.boards.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'threads' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('threads')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'threads' && styles.filterButtonTextActive]}>
              Threads ({results.threads.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'replies' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('replies')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'replies' && styles.filterButtonTextActive]}>
              Replies ({results.replies.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'users' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('users')}
          >
            <Text style={[styles.filterButtonText, activeFilter === 'users' && styles.filterButtonTextActive]}>
              Users ({results.users.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : getTotalResults() === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found for "{query}"</Text>
            <Text style={styles.emptySubtext}>Try different keywords or check your spelling</Text>
          </View>
        ) : (
          <>
            {filteredResults.boards.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Boards</Text>
                {filteredResults.boards.map((board) => (
                  <TouchableOpacity 
                    key={board.id} 
                    style={styles.resultCard}
                    onPress={() => navigateToBoard(board)}
                  >
                    <Text style={styles.resultCode}>{board.code}</Text>
                    <Text style={styles.resultTitle}>{board.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {filteredResults.threads.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Threads</Text>
                {filteredResults.threads.map((thread) => {
                  const board = boards.find(b => b.id === thread.boardId);
                  return (
                    <TouchableOpacity 
                      key={thread.id} 
                      style={styles.resultCard}
                      onPress={() => navigateToThread(thread)}
                    >
                      <View style={styles.threadHeader}>
                        <Text style={styles.boardTag}>{board?.code || 'Unknown'}</Text>
                        <Text style={styles.authorText}>by {thread.username}</Text>
                      </View>
                      <Text style={styles.resultTitle}>{thread.title}</Text>
                      <Text style={styles.resultPreview} numberOfLines={2}>
                        {thread.content}
                      </Text>
                        <View style={styles.threadTags}>
                            <View style={[styles.threadTag, { backgroundColor: getStatusColor(thread.status) }]}>
                            <Text style={styles.threadTagText}>{thread.status}</Text>
                            </View>
                      </View>                        
                      <Text style={styles.timestamp}>{thread.date}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {filteredResults.replies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Replies</Text>
                {filteredResults.replies.map((reply, index) => {
                  const thread = results.threads.find(t => t.id === reply.threadId);
                  const board = boards.find(b => b.id === thread?.boardId);
                  return (
                    <TouchableOpacity 
                      key={`${reply.id}-${index}`} 
                      style={styles.resultCard}
                      onPress={() => thread && navigateToThread(thread)}
                    >
                      <View style={styles.threadHeader}>
                        <Text style={styles.boardTag}>{board?.code || 'Unknown'}</Text>
                        <Text style={styles.authorText}>by {reply.author}</Text>
                      </View>
                      <Text style={styles.resultPreview} numberOfLines={3}>
                        {reply.content}
                      </Text>
                      {thread && (
                        <Text style={styles.threadReference}>
                          In thread: {thread.title}
                        </Text>
                      )}
                      <Text style={styles.timestamp}>{reply.timestamp}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {filteredResults.users.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Users</Text>
                {filteredResults.users.map((user, index) => (
                  <TouchableOpacity 
                    key={`${user.username}-${index}`} 
                    style={styles.resultCard}
                  >
                    <Text style={styles.usernameText}>{user.username}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userRole}>Role: {user.role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}