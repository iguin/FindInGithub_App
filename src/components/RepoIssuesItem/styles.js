import { StyleSheet } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 7,
    borderRadius: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  description: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontFamily: fontsFamily.regular,
    textTransform: 'uppercase',
    fontSize: 8,
    color: '#FFFFFF',
    opacity: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    fontSize: 12,
  },
});