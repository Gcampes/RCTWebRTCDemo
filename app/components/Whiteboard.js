import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
import Color from '../stylesheets/Pallete';

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayDark
  },
  navigationBarItem: {
    color: Color.white
  },
  navigator: {
    paddingTop: 64
  },
  container: {
    backgroundColor: Color.grayDark,
    flex: 1
  },
  whiteboard: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 3,
    height: 300,
    borderColor: Color.white,
    marginLeft: 5,
    marginRight: 5,
  },
  whiteboardText: {
    color: Color.white
  }
});


class WhiteboardArea extends Component {
  render() {
    // console.log('Kappa', this.props.tasks, Meteor);
    return (
      <View style={styles.whiteboard}>
        <Text style={styles.whiteboardText}>Whiteboard Areaa {this.props.tasks.length}</Text>
      </View>
    )
  }
}

export default createContainer(params=>{
  return {
    tasks: Meteor.collection('users').find({}),
  };
}, WhiteboardArea)
