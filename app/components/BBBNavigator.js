/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Meteor, { connectMeteor } from 'react-native-meteor';

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
  }
});

// import WebRTC from './Webrtc';
import WhiteboardArea from './Whiteboard';

class UserList extends Component {
  render() {
    return (
      <Text>User List</Text>
    )
  }
}

const routes = [
  {title: 'Whiteboard', index: 0, component: <WhiteboardArea/>},
  {title: 'UserList', index: 1, component: <UserList/>},
];
class BBBNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.renderScene}
        navigationBar={this.renderNavigationBar()}
        style={styles.navigator}
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <View>
          {route.component}
        </View>
      </View>
    )
  }

  renderNavigationBar() {
    return (
      <Navigator.NavigationBar
        style={styles.navbar}
        routeMapper={{
          LeftButton: (route, navigator, index, navState) =>
           { return (<Text style={styles.navigationBarItem}>Cancel</Text>); },
          RightButton: (route, navigator, index, navState) =>
            { return (<Text style={styles.navigationBarItem}>Done</Text>); },
          Title: (route, navigator, index, navState) =>
            { return (<Text style={styles.navigationBarItem}>IMD 004 Design Process</Text>); },
        }}
      />
    )
  }

  sceneTransitions(route, routeStack) {
    console.log('Route', route);
    console.log('Route Stack', routeStack);
    return Navigator.SceneConfigs.FloatFromBottom
  }
}

module.exports = BBBNavigator;
