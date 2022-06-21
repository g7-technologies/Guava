import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class OtherPersonFollowings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor: '#fff',}}>

        <Text> Followings </Text>
      </View>
    );
  }
}
