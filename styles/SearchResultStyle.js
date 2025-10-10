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
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
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
  filtersContainer: {
    backgroundColor: "#00205B",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#003380',
  },
  filtersContent: {
    paddingHorizontal: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#003380',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#fff',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#00205B',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: '#003380',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  resultCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  resultPreview: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 8,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  boardTag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  authorText: {
    fontSize: 12,
    color: '#fff',
  },
  timestamp: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.6,
    marginTop: 4,
  },
  threadReference: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 4,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.7,
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
  closedTag: {
    backgroundColor: '#FF4A4A',
  },
  threadTagText: {
    color:'#fff',
    fontSize:11,
    fontWeight:'bold',
  },

})