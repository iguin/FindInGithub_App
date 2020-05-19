import { StyleSheet } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontsFamily.regular,
    color: '#FFFFFF',
  }
});