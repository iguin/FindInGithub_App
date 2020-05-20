import { StyleSheet } from "react-native";
import { fontsFamily, colors } from "../../shared/globalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: fontsFamily.regular,
    fontSize: 16,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  headerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 7,
    marginRight: 3,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    opacity: 0.5,
    fontFamily: fontsFamily.regular,
  },
  content: {
    paddingHorizontal: 20,
  },
  description: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 10,
    lineHeight: 14,
    fontStyle: 'italic',
    fontFamily: fontsFamily.regular,
  },
  repoDates: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    width: '32.5%',
    height: 45,
    justifyContent: 'space-between',
    padding: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateItemTitle: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: fontsFamily.regular,
    textTransform: 'uppercase',
    opacity: .5,
  },
  dataItemContent: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: fontsFamily.regular,
  },
});