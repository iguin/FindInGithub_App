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
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  descriptionItem: {
    alignItems: 'flex-start',
    padding: 10,
  },
  descriptionTitle: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    opacity: 0.5,
    fontSize: 10,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.bold,
    fontSize: 20,
  },

  options: {
    paddingHorizontal: 20,
  },
  optionBtn: {
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBtnText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: fontsFamily.regular,
    textTransform: 'uppercase',
  },

  searchLoading: {
    marginTop: 15,
  },
  flatList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});