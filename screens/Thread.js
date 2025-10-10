import { Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/ThreadStyle';

export default function Thread({ navigation, route }) {
  const { thread: initialThread, boardId, boardCode } = route.params;
  
  const [user, setUser] = useState(null);
  const [thread, setThread] = useState(initialThread);
  const [replies, setReplies] = useState([]);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const scrollViewRef = React.useRef(null);
  const postRefs = React.useRef({});
  const [highlightedPostId, setHighlightedPostId] = useState(null);
  const [adminMenuVisible, setAdminMenuVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  
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

  useEffect(() => {
    getCurrentUser();
    loadReplies();
  }, []);

  const getCurrentUser = async () => {
    try {
      const currentUserJson = await AsyncStorage.getItem('currentUser');
      if (currentUserJson) {
        setUser(JSON.parse(currentUserJson));
      }
    } catch (e) {
      console.log("Error getting current user", e);
    }
  };

  const loadReplies = async () => {
    try {
      const repliesJson = await AsyncStorage.getItem(`replies_${thread.id}`);
      if (repliesJson) {
        setReplies(JSON.parse(repliesJson));
      }
    } catch (e) {
      console.log("Error loading replies", e);
    }
  };

  const updateUserReplyCount = async () => {
    try {
      const currentUserJson = await AsyncStorage.getItem('currentUser');
      if (currentUserJson) {
        const currentUser = JSON.parse(currentUserJson);
        
        currentUser.repliesMade = (currentUser.repliesMade || 0) + 1;
        
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        const usersJson = await AsyncStorage.getItem('users');
        if (usersJson) {
          const users = JSON.parse(usersJson);
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex].repliesMade = currentUser.repliesMade;
            await AsyncStorage.setItem('users', JSON.stringify(users));
          }
        }
      }
    } catch (error) {
      console.log('Error updating user reply count:', error);
    }
  };

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1920,
      maxHeight: 1920,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setAttachments([...attachments, {
          type: 'image',
          uri: asset.uri,
          name: asset.fileName || 'image.jpg'
        }]);
      }
    });
  };

  const handlePickFile = async () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.errorCode) {
        console.log('FilePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick file');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setAttachments([...attachments, {
          type: asset.type?.includes('video') ? 'video' : 'document',
          uri: asset.uri,
          name: asset.fileName || 'file'
        }]);
      }
    });
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmitReply = async () => {
    if (!user) {
      Alert.alert('Error', 'Please login to reply');
      return;
    }

    if (!replyText.trim() && attachments.length === 0) {
      Alert.alert('Error', 'Please enter a reply or attach a file');
      return;
    }


    setIsSubmitting(true);

    try {
      const newReply = {
        id: Date.now().toString(),
        threadId: thread.id,
        replyingTo: replyingTo,
        username: user.username,
        role: user.role || 'Student',
        profileImage: user.profileImage || null,
        content: replyText.trim(),
        attachments: attachments,
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        createdAt: Date.now(),
        userId: user.id
      };

      const updatedReplies = [...replies, newReply];
      await AsyncStorage.setItem(`replies_${thread.id}`, JSON.stringify(updatedReplies));

      const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
      if (threadsJson) {
        const threads = JSON.parse(threadsJson);
        const threadIndex = threads.findIndex(t => t.id === thread.id);
        if (threadIndex !== -1) {
          threads[threadIndex].replies = updatedReplies.length;
          threads[threadIndex].lastReplyAt = Date.now();
          await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(threads));
          setThread(threads[threadIndex]);
        }
      }

      await updateUserReplyCount();

      setReplies(updatedReplies);
      setReplyText('');
      setAttachments([]);
      setReplyingTo(null);
      setReplyModalVisible(false);
      Alert.alert('Success', 'Reply posted successfully!');
    } catch (error) {
      console.log('Error submitting reply:', error);
      Alert.alert('Error', 'Failed to post reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseThread = async () => {
    Alert.alert(
      'Close Thread',
      'Are you sure you want to close this thread?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close',
          onPress: async () => {
            try {
              const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
              if (threadsJson) {
                const threads = JSON.parse(threadsJson);
                const threadIndex = threads.findIndex(t => t.id === thread.id);
                if (threadIndex !== -1) {
                  threads[threadIndex].isClosed = true;
                  await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(threads));
                  setThread({ ...thread, isClosed: true });
                  Alert.alert('Success', 'Thread closed');
                }
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to close thread');
            }
          }
        }
      ]
    );
  };

  const handleDeletePost = async (postId, isThread = false) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              if (isThread) {
                const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
                if (threadsJson) {
                  let threads = JSON.parse(threadsJson);
                  threads = threads.filter(t => t.id !== thread.id);
                  await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(threads));
                  Alert.alert('Success', 'Thread deleted');
                  navigation.goBack();
                }
              } else {
                const repliesJson = await AsyncStorage.getItem(`replies_${thread.id}`);
                if (repliesJson) {
                  let updatedReplies = JSON.parse(repliesJson).filter(r => r.id !== postId);
                  await AsyncStorage.setItem(`replies_${thread.id}`, JSON.stringify(updatedReplies));
                  setReplies(updatedReplies);

                  const threadsJson = await AsyncStorage.getItem(`threads_${boardId}`);
                  if (threadsJson) {
                    const threads = JSON.parse(threadsJson);
                    const threadIndex = threads.findIndex(t => t.id === thread.id);
                    if (threadIndex !== -1) {
                      threads[threadIndex].replies = updatedReplies.length;
                      await AsyncStorage.setItem(`threads_${boardId}`, JSON.stringify(threads));
                    }
                  }

                  Alert.alert('Success', 'Reply deleted');
                }
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete post');
              console.log('Delete error:', error);
            }
          },
        },
      ]
    );
  };

  const handleBanUser = async (targetPost) => {
    if (targetPost.role?.toLowerCase() === 'admin') {
      Alert.alert('Error', 'You cannot ban another admin.');
      return;
    }

    Alert.alert(
      'Ban User',
      `Are you sure you want to ban ${targetPost.username}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Ban',
          onPress: async () => {
            try {
              const usersJson = await AsyncStorage.getItem('users');
              if (usersJson) {
                const users = JSON.parse(usersJson);
                const userIndex = users.findIndex(u => u.id === targetPost.userId);
                if (userIndex !== -1) {
                  users[userIndex].banned = true;
                  await AsyncStorage.setItem('users', JSON.stringify(users));
                  Alert.alert('Success', `${targetPost.username} has been banned`);
                } else {
                  Alert.alert('Error', 'User not found in database');
                }
              }
            } catch (error) {
              console.log('Ban error:', error);
              Alert.alert('Error', 'Failed to ban user');
            }
          },
        },
      ]
    );
  };


  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return '#4dee55ff';
      case 'tutor':
        return '#FFD700';
      case 'student':
      default:
        return '#8899BB';
    }
  };

  const scrollToPost = (postId) => {
    if (postRefs.current[postId]) {
      postRefs.current[postId].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
          setHighlightedPostId(postId);

          setTimeout(() => {
            setHighlightedPostId(null);
          }, 3000);
        },
        () => console.log('Measurement failed')
      );
    }
  };

  const getRepliesToPost = (postId) => {
    return replies.filter(r => r.replyingTo === postId);
  };

  const openReplyModal = (postId) => {
    if (!user) {
      Alert.alert('Error', 'Please login to reply');
      return;
    }
    setReplyingTo(postId);
    setReplyModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.boardCode}>{boardCode}</Text>
      </View>

      <ScrollView style={styles.content} ref={scrollViewRef}>
        <View 
            style={[
              styles.postCard,
              highlightedPostId === thread.id && { backgroundColor: '#003380' }
            ]}
            ref={ref => postRefs.current[thread.id] = ref}
          >
          <View style={styles.postHeader}>
            <View style={styles.avatar}>
              {thread.profileImage ? (
                <Image source={{ uri: thread.profileImage }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarEmoji}>👤</Text>
              )}
            </View>
            <View style={styles.userInfo}>
              <View style={styles.dateRow}>
                <Text style={styles.date}>{thread.date}</Text>
              </View>
              <Text style={styles.username}>{thread.username}</Text>
              <Text style={[styles.role, { color: getRoleColor(thread.role) }]}>
                {thread.role}
              </Text>
            </View>
            <View style={styles.postNumber}>
              <Text style={styles.postNumberText}>#{thread.id.slice(-6)}</Text>
            </View>
            {user?.role === 'admin' && (
              <TouchableOpacity 
                onPress={() => {
                  setSelectedPost({ ...thread, isThreadPost: true });
                  setAdminMenuVisible(true);
                }}
                style={{ marginLeft: 10, padding: 5 }}
              >
                <Text style={{ fontSize: 20, color: "#fff" }}>⋮</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.threadTitle}>{thread.title}</Text>
          <Text style={styles.postContent}>{thread.content}</Text>

          <View style={styles.postFooter}>
            <View style={[styles.threadTag, { backgroundColor: getStatusColor(thread.status) }]}>
              <Text style={styles.threadTagText}>{thread.status}</Text>
            </View>
          </View>

          {getRepliesToPost(thread.id).length > 0 && (
            <View style={styles.repliesLinks}>
              <Text style={styles.repliesLinksLabel}>Replies: </Text>
              {getRepliesToPost(thread.id).map((reply, idx) => (
                <TouchableOpacity 
                  key={reply.id}
                  onPress={() => scrollToPost(reply.id)}
                >
                  <Text style={styles.replyLink}>
                    #{reply.id.slice(-6)}{idx < getRepliesToPost(thread.id).length - 1 ? ', ' : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {!thread.isClosed && (
            <TouchableOpacity 
              style={styles.replyButton}
              onPress={() => openReplyModal(thread.id)}
            >
              <Text style={styles.replyIcon}>💬</Text>
            </TouchableOpacity>
          )}
        </View>

        {replies.map((reply, index) => (
          <View 
              key={reply.id} 
              style={[
                styles.postCard,
                highlightedPostId === reply.id && { backgroundColor: '#003380' }
              ]}
              ref={ref => postRefs.current[reply.id] = ref}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                {reply.profileImage ? (
                  <Image source={{ uri: reply.profileImage }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarEmoji}>👤</Text>
                )}
              </View>
              <View style={styles.userInfo}>
                <View style={styles.dateRow}>
                  <Text style={styles.date}>{reply.date}</Text>
                </View>
                <Text style={styles.username}>{reply.username}</Text>
                <Text style={[styles.role, { color: getRoleColor(reply.role) }]}>
                  {reply.role}
                </Text>
              </View>
              <View style={styles.postNumber}>
                <TouchableOpacity onPress={() => scrollToPost(reply.id)}>
                  <Text style={styles.postNumberText}>
                    #{reply.id.slice(-6)}
                  </Text>
                </TouchableOpacity>
                {reply.replyingTo && (
                  <TouchableOpacity onPress={() => scrollToPost(reply.replyingTo)}>
                    <Text style={styles.postNumberText}>
                      {" >>"} #{reply.replyingTo.slice(-6)}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {user?.role === 'admin' && (
                <TouchableOpacity 
                  onPress={() => {
                    setSelectedPost({ ...reply, isThreadPost: false });
                    setAdminMenuVisible(true);
                  }}
                  style={{ marginLeft: 10, padding: 5 }}
                >
                  <Text style={{ fontSize: 20, color: "#fff" }}>⋮</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.postContent}>{reply.content}</Text>

            {reply.attachments && reply.attachments.length > 0 && (
              <View style={styles.attachmentsContainer}>
                {reply.attachments.map((attachment, idx) => (
                  <View key={idx} style={styles.attachmentBadge}>
                    <Text style={styles.attachmentText}>
                      📎 {attachment.name}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {getRepliesToPost(reply.id).length > 0 && (
              <View style={styles.repliesLinks}>
                <Text style={styles.repliesLinksLabel}>Replies: </Text>
                {getRepliesToPost(reply.id).map((r, idx) => (
                  <TouchableOpacity 
                    key={r.id}
                    onPress={() => scrollToPost(r.id)}
                  >
                    <Text style={styles.replyLink}>
                      #{r.id.slice(-6)}{idx < getRepliesToPost(reply.id).length - 1 ? ', ' : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!thread.isClosed && (
              <TouchableOpacity 
                style={styles.replyButton}
                onPress={() => openReplyModal(reply.id)}
              >
                <Text style={styles.replyIcon}>💬</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {thread.isClosed && (
          <View style={styles.endOfThread}>
            <Text style={styles.endOfThreadText}>[End of thread]</Text>
          </View>
        )}

        {user && (user.role === 'Admin') && !thread.isClosed && (
          <TouchableOpacity style={styles.closeThreadButton} onPress={handleCloseThread}>
            <Text style={styles.closeThreadButtonText}>Close Thread</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        visible={replyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reply to Thread</Text>
              <TouchableOpacity onPress={() => setReplyModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <TextInput
                style={styles.replyInput}
                placeholder="Write your reply..."
                placeholderTextColor="#666"
                value={replyText}
                onChangeText={setReplyText}
                multiline
                textAlignVertical="top"
              />

              {attachments.length > 0 && (
                <View style={styles.attachmentsList}>
                  {attachments.map((attachment, index) => (
                    <View key={index} style={styles.attachmentItem}>
                      <Text style={styles.attachmentName} numberOfLines={1}>
                        {attachment.type === 'image' ? '🖼️' : '📄'} {attachment.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeAttachment(index)}>
                        <Text style={styles.removeAttachment}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.attachmentButtons}>
                <TouchableOpacity style={styles.attachButton} onPress={handlePickImage}>
                  <Text style={styles.attachButtonText}>📷 Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.attachButton} onPress={handlePickFile}>
                  <Text style={styles.attachButtonText}>📎 Media</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.submitReplyButton, isSubmitting && styles.submitReplyButtonDisabled]}
              onPress={handleSubmitReply}
              disabled={isSubmitting}
            >
              <Text style={styles.submitReplyButtonText}>
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              Manage Post
            </Text>

            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => {
                setAdminMenuVisible(false);
                handleDeletePost(selectedPost?.id, selectedPost?.isThreadPost);
              }}
            >
              <Text style={{ fontSize: 15, color: '#007bff' }}>Delete Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => {
                setAdminMenuVisible(false);
                handleBanUser(selectedPost);
              }}
            >
              <Text style={{ fontSize: 15, color: 'red' }}>Ban User</Text>
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