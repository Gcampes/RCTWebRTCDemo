import { StyleSheet } from 'react-native';
import Color from '../../../stylesheets/Pallete';

export default StyleSheet.create({
  userItem: {
    height: 40,
    marginTop: 15,
    flex: 1,
    flexDirection: 'row'
  },

  name: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 5,
  },

  nameText: {
    color: Color.gray
  },

  icons: {
    flex: 1,
    backgroundColor: Color.gray
  }
});
