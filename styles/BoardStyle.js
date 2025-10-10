import {StyleSheet,Dimensions} from 'react-native'
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
  boardHeader: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#00205B',
  },
  boardCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  boardTitle: {
    fontSize: 15,
    color: '#ffffffff',
  },
  sortContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#00205B',
    alignItems: 'flex-end',
  },
  sortButton: {
    backgroundColor: '#003380',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sortDropdown: {
    backgroundColor: '#003380',
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00205B',
  },
  sortOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  sortOptionSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
  threadsList: {
    padding: 15,
  },
  threadCard: {
    backgroundColor: '#003380',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  threadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#adadadff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  threadUserInfo: {
    flex: 1,
  },
  threadUsername: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  threadRole: {
    color: '#8899BB',
    fontSize: 12,
  },
  threadTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  threadPreview: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  threadFooter: {
    paddingTop: 10,
  },
  threadTags: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  threadTag: {
    paddingHorizontal:12,
    paddingVertical:4,
    borderRadius:4,
  },
  threadTagText: {
    color:'#fff',
    fontSize:11,
    fontWeight:'bold',
  },
  threadMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threadMetaText: {
    color: '#8899BB',
    fontSize: 12,
  },
  newThreadButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#00205B',
    borderWidth:3,
    borderColor:'#C8102E',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  newThreadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  avatarImage: {
  width: '100%',
  height: '100%',
  borderRadius: 20,
},

})