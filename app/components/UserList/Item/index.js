import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import styles from './styles';
import Color from '../../../stylesheets/Pallete';
import UserAvatar from '../../UserAvatar';

class UserItem extends Component {
  render() {
    const user = this.props.user;

    return (
      <View style={styles.userItem}>
        <UserAvatar user={user}/>
        <View style={styles.name}>
          <Text>{user.name}</Text>
        </View>
        <View style={styles.icons}>
          <Text>lul</Text>
        </View>
      </View>
    );
  }
}

export default UserItem;
