import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';

class Test extends Component {
  constructor() {
    super();
  }

  render() {
      return(
        <View style = {{flex:1}}>
          <View style = {{flex: .5, backgroundColor: '#000'}}>

          </View>

          <View style = {{flex: .5, backgroundColor: '#fff'}}>

          </View>

        </View>
      )
  }

}

export default Test;
