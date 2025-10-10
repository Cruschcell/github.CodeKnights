import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/AddThreadStyle';

export default function AddThread({ navigation, route }) {
  const { boardId, boardCode, user } = route.params;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('HELP ME PLS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = ['HELP ME PLS', 'BEST ANSWER', 'DISCUSSION'];

  const updateUserThreadCount = async () => {
    try {
      const currentUserJson = await AsyncStorage.getItem('currentUser');
      if (currentUserJson) {
        const currentUser = JSON.parse(currentUserJson);
        
        currentUser.threadsCreated = (currentUser.threadsCreated || 0) + 1;
        
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        const usersJson = await AsyncStorage.getItem('users');
        if (usersJson) {
          const users = JSON.parse(usersJson);
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex].threadsCreated = currentUser.threadsCreated;
            await AsyncStorage.setItem('users', JSON.stringify(users));
          }
        }
      }
    } catch (error) {
      console.log('Error updating user thread count:', error);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a thread title');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter thread content');
      return;
    }

    setIsSubmitting(true);

    try {
      const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
      const existingThreads = threadsJson ? JSON.parse(threadsJson) : [];

      const newThread = {
        id: Date.now().toString(),
        username: user.username,
        role: user.role || 'Student',
        title: title.trim(),
        content: content.trim(),
        status: status,
        replies: 0,
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        createdAt: Date.now(),
        isClosed: false,
        userId: user.id,
        profileImage:user.profileImage || null,
      };
      console.log('=== CREATING THREAD ===');
      console.log('User object:', user);
      console.log('User ID:', user.id);
      console.log('New thread userId:', newThread.userId);
      console.log('======================');
      
      const updatedThreads = [newThread, ...existingThreads];
      await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(updatedThreads));
      
      await updateUserThreadCount();
      
      Alert.alert('Success', 'Thread created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      console.log('Error creating thread:', error);
      Alert.alert('Error', 'Failed to create thread. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Thread</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.boardInfo}>
        <Text style={styles.boardCode}>{boardCode}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Thread Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter thread title..."
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.statusButton,
                  status === option && styles.statusButtonActive
                ]}
                onPress={() => setStatus(option)}
              >
                <Text style={[
                  styles.statusButtonText,
                  status === option && styles.statusButtonTextActive
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write your thread content here..."
            placeholderTextColor="#666"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Creating...' : 'Create Thread'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}