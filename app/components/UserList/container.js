import React, { Component } from 'react';
import { createContainer } from 'react-native-meteor';
import Service from './service';

import UserList from './component';

class UserListContainer extends Component {
  render() {
    return (
      <UserList
        {...this.props}>
        {this.props.children}
      </UserList>
    );
  }
}

export default createContainer(() => ({
  users: Service.getUsers()
}), UserListContainer);
