import { StyleSheet, Dimensions } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    flex: 1,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    fontSize: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 10,
  },
  footer: {
    height: 50,
    backgroundColor: '#111111',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
  },
  footerPageIndicator: {
    color: '#FFFFFF',
    opacity: 0.5,
    fontSize: 25,
    fontFamily: fontsFamily.regular,
  },
});
