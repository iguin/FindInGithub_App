import { StyleSheet } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  userDescription: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontsFamily.regular,
  },
  subDesc: {
    color: '#FFFFFF',
    opacity: .3,
    fontFamily: fontsFamily.regular,
  },
});