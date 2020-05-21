import { StyleSheet, Dimensions } from "react-native";
import { fontsFamily } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    flex: 1,
  },
  header: {
    height: 40,
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
    textTransform: 'uppercase'
  },
  dataControlls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
  },
  stateControllText: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    fontSize: 12,
    marginHorizontal: 3,
  },
  content: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 10,
  },
  moreIssues: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  }
});
