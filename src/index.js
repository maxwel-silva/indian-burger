import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Index extends Component {

  constructor(props) {
     super(props);
     this.state = {
       module:1,
     }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>sas</Text>
      </View>
    );
  }
}