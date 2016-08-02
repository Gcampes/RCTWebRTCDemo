/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Meteor, { createContainer } from 'react-native-meteor';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView
} from 'react-native';
import Color from '../../stylesheets/Pallete';
import UserItem from './Item';

const styles = StyleSheet.create({
  UserListContainer: {
    paddingTop: 18,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Color.white,
    flex: 1
  },
  ParticipansTitle: {
    fontSize: 20,
    color: Color.gray,
    fontFamily: 'Arial'
  }
});

class UserList extends Component {
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let array = [];

    let users = this.props.users;
    console.log(users);
    users.forEach(user => array.push(user))

    dataSource = ds.cloneWithRows(array);

    return (
      <View style={styles.UserListContainer}>
        <Text style={styles.ParticipansTitle}>Participants</Text>
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) => <UserItem user={rowData} />}
          />
      </View>
    );
  }
}

export default UserList;
