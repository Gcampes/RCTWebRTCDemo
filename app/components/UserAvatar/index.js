import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import getColor from '../../utils/color';
import Color from '../../stylesheets/Pallete';

import styles from './styles';

export default class UserAvatar extends Component {
  render() {
    const user = this.props.user;

    const avatarStyle = {
      backgroundColor: getColor(user.name),
      borderRadius: 25,
      height: 40,
      width: 40,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <View style={avatarStyle}>
        <Text style={styles.avatarText}>{user.name.slice(0, 2)}</Text>
        {this.renderUserStatus()}
        {this.renderUserMediaStatus()}
      </View>
    )
  }

  renderUserStatus() {
    const user = this.props.user;

    const userStatusStyle = {
      justifyContent: 'center',
      position: 'absolute',
      borderColor: user.isModerator ? Color.grayLight : Color.white,
      borderWidth: (user.isModerator && !user.isPresenter) ? 1 : 0,
      backgroundColor: user.isPresenter ? Color.primary: Color.white,
      borderRadius: 2,
      width: 11,
      height: 11,
      top: 1,
      left: 1
    };

    if (user.isModerator || user.isPresenter) {
      return (
        <View style={styles.userStatusContainer}>
          <View style={styles.userStatusBorder} />
          <View style={userStatusStyle} />
        </View>
      );
    }
  }

  renderUserMediaStatus() {
    const user = this.props.user;

    const userMediaStatusStyle = {
      justifyContent: 'center',
      position: 'absolute',
      borderColor: Color.grayLight,
      borderWidth: user.isListenOnly ? 1 : 0,
      backgroundColor: user.isListenOnly ? Color.white: Color.success,
      borderRadius: 6,
      width: 11,
      height: 11,
      top: 1,
      left: 1,
    }

    if (user.isVoiceUser || user.isListenOnly) {
      return (
        <View style={styles.userMediaContainer}>
          <View style={styles.userMediaStatusBorder} />
          <View style={userMediaStatusStyle} />
        </View>
      )
    }
  }
}
