import { StyleSheet } from "react-native";
import { colors, fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDesc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 35,
    height: 35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontsFamily.bold,
    marginLeft: 10,
  },
  closeBtn: {
    paddingVertical: 5,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    textTransform: 'uppercase',
    fontSize: 12,
    opacity: 0.7,
  },

  userDescription: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  descriptionItem: {
    height: 50,
    width: 70,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginRight: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  descriptionTitle: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    opacity: 0.5,
    fontSize: 9,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.bold,
    fontSize: 20,
  },

  repositoriesTitle: {
    marginHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: fontsFamily.regular,
    textTransform: 'uppercase',
    opacity: .5,
  },

  searchLoading: {
    marginTop: 15,
  },
  flatList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});