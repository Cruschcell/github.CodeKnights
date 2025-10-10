import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get("window");

export default StyleSheet.create({
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
  content: {
    flex: 1,
  },
  headerSection: {
    position: 'relative',
  },
  coverImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#003380',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003380',
  },
  coverImageText: {
    color: '#8899BB',
    fontSize: 16,
  },
  profileSection: {
    backgroundColor: '#00205B',
    paddingBottom: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: -60,
    marginBottom: 15,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#adadadff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#00205B',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarEmoji: {
    fontSize: 60,
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  userRole: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#00205B',
    borderTopWidth: 1,
    borderTopColor: '#003380',
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    color: '#8899BB',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#00205B',
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8899BB',
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  aboutItem: {
    backgroundColor: '#003380',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  aboutItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#8899BB',
    marginBottom: 5,
  },
  aboutValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  editButton: {
    color: '#4A9EFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#003380',
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#8899BB',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#8899BB',
    marginHorizontal: 10,
  },
  bioModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: width * 0.85,
  },
  bioModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00205B',
    marginBottom: 15,
  },
  bioInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    color: '#000',
    marginBottom: 8,
  },
  characterCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginBottom: 15,
  },
  bioModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  bioModalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bioModalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  bioModalSave: {
    backgroundColor: '#00205B',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  bioModalSaveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
threadCard: {
  backgroundColor: '#003380',
  borderRadius: 8,
  padding: 15,
  marginHorizontal:10,
  marginBottom: 10,
},
threadCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
threadBoardCode: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
},
threadDate: {
  color: '#fff',
  fontSize: 12,
},
threadCardTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
},
threadCardContent: {
  color: '#fff',
  fontSize: 13,
  marginBottom: 12,
  lineHeight: 20,
},
threadCardFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
threadStatus: {
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 4,
},
threadStatusText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: 'bold',
},
threadReplies: {
  color: '#fff',
  fontSize: 12,
},
replyCard: {
  backgroundColor: '#003380',
  borderRadius: 8,
  padding: 15,
  marginHorizontal:10,
  marginBottom: 10,
},
replyCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 6,
},
replyBoardCode: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
},
replyDate: {
  color: '#fff',
  fontSize: 12,
},
replyThreadTitle: {
  color: '#4dee55ff',
  fontSize: 13,
  fontWeight: '600',
  marginBottom: 8,
  fontStyle: 'italic',
},
replyCardContent: {
  color: '#fff',
  fontSize: 14,
  lineHeight: 20,
},
replyAttachments: {
  marginTop: 8,
  paddingTop: 8,
  borderTopWidth: 1,
  borderTopColor: '#00205B',
},
replyAttachmentsText: {
  color: '#fff',
  fontSize: 12,
},
})