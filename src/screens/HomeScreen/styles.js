import { StyleSheet } from "react-native";
import { fontsFamily, colors } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontsFamily.bold,
    color: colors.primary,
    fontSize: 30,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: fontsFamily.bold,
    color: colors.primary,
    opacity: 0.4,
    textTransform: 'uppercase'
  },
});