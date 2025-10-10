import {StyleSheet, Dimensions} from 'react-native'
const { width } = Dimensions.get('window');


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
})