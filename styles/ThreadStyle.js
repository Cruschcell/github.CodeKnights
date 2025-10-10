import {StyleSheet,Dimensions} from 'react-native'
const { width } = Dimensions.get('window');

export default StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#00205B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  boardCode: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  postCard: {
    borderBottomWidth: 0.5,
    borderTopWidth:1,
    borderBottomColor:"#fff",
    borderTopColor:"#fff",
    padding: 15,
    position: 'relative',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
  width: '100%',
  height: '100%',
  borderRadius: 25,
},
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  dateRow: {
    marginBottom: 2,
  },
  date: {
    color: '#8899BB',
    fontSize: 12,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  role: {
    fontSize: 12,
    fontWeight: '500',
  },
  postNumber: {
    alignItems: 'flex-end',
  },
  postNumberText: {
    color: '#fff',
    fontSize: 11,
  },
  threadTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContent: {
    color: '#E5E7EB',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  threadTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  threadTagText: {
   color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  repliesLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
  },
  repliesLinksLabel: {
    color: '#8899BB',
    fontSize: 13,
    marginRight: 6,
  },
  replyLink: {
    color: '#fff',
    fontSize: 13,
  },
  replyButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyIcon: {
    fontSize: 20,
  },
  attachmentsContainer: {
    marginTop: 10,
    gap: 8,
  },
  attachmentBadge: {
    backgroundColor: '#003380',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  attachmentText: {
    color: '#fff',
    fontSize: 13,
  },
  endOfThread: {
    padding: 20,
    alignItems: 'center',
  },
  endOfThreadText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
  closeThreadButton: {
    margin: 20,
    backgroundColor: '#FF4A4A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeThreadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00205B',
  },
  modalClose: {
    fontSize: 28,
    color: '#00205B',
    fontWeight: '300',
  },
  modalBody: {
    padding: 20,
  },
  replyInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#000',
    minHeight: 150,
    marginBottom: 15,
  },
  attachmentButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  attachButton: {
    flex: 1,
    backgroundColor: '#00205B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  attachButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  attachmentsList: {
    gap: 8,
    marginBottom: 15,
  },
  attachmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
  },
  attachmentName: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    marginRight: 10,
  },
  removeAttachment: {
    color: '#FF4A4A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitReplyButton: {
    margin: 20,
    backgroundColor: '#C8102E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitReplyButtonDisabled: {
    backgroundColor: '#999',
  },
  submitReplyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})