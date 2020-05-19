import { StyleSheet } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontsFamily.regular,
    color: '#FFFFFF',
  },
  icon: {
    opacity: .5,
  },
});