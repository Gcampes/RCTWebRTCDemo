/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Meteor from 'react-native-meteor';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import BBBNavigator from '../BBBNavigator';
import UserList from '../UserList/container';
import styles from './styles';
import { subscribeToCollections } from './service';

Meteor.connect('ws://192.168.56.101/html5client/websocket');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false};

    subscribeToCollections(() => this.setState({isReady: true}));
  }
  render() {
    if(this.state) {
      console.log(this.state);
      if(this.state.isReady) {
        return (
          <SideMenu menu={<UserList/>}>
            <BBBNavigator/>
          </SideMenu>
        );
      }
    }

    return null;
  }
}

AppRegistry.registerComponent('App', () => App);
module.exports = App;
