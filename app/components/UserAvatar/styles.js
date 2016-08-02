import { StyleSheet } from 'react-native';
import Color from '../../stylesheets/Pallete';

export default StyleSheet.create({
  avatar: {
    backgroundColor: Color.primary,
    borderRadius: 25,
    width: 11,
    height: 11,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: Color.white,
    fontSize: 15
  },
  userStatusContainer: {
    position: 'absolute',
    top: 0
  },
  userStatusBorder: {
    position: 'absolute',
    backgroundColor: Color.white,
    width: 13,
    height: 13,
    borderRadius: 2,
    top: 0,
    left: 0,
  },
  userStatus: {
    position: 'absolute',
    backgroundColor: Color.white,
    width: 10,
    height: 10,
    borderRadius: 2,
    top: 0,
    left: 0,
  },
  userMediaStatusBorder: {
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 6,
    width: 13,
    height: 13
  },

  userMediaContainer: {
    backgroundColor: Color.gray,
    position: 'absolute',
    left: 27
  }
});
