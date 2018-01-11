import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Image} from 'react-native';
import Button from './Button';
import axios from 'axios';
import Dimensions from 'Dimensions';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    if(props.navigation.state.params.type == 'fb') {
      this.state = {
        first_name: props.navigation.state.params.fname,
        last_name: props.navigation.state.params.lname,
        uname: '',
        password: '',
        email: props.navigation.state.params.fbEmail,
      }
    } else if(props.navigation.state.params.type == 'signup') {
      this.state = {
        first_name: '',
        last_name: '',
        uname: '',
        password: '',
        email: '',
      }
    } else {
      this.state = {
        first_name: '',
        last_name: '',
        uname: '',
        password: '',
        email: '',
      }
    }
  };

  handlePress(event) {

  }

  render() {
    const {container, logo, backgroundImage, input} = styles;

    return (
      <View >

        <View style = {{alignItems: 'center', flexGrow: 1}}>
          <Image style = {backgroundImage} source = {require('../../components/Images/bg.png') }/>
          <Image resizeMode="contain" style = {logo} source = {require('../../components/Images/black_logo.png') }/>
        </View>

        <View style = {container}>
          <StatusBar barStyle="light-content"/>

          <TextInput style = {input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          value = {this.state.email}
          keyboardType='email-address'
          placeholder='Email'
          returnKeyType="go"
          placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          value = {this.state.first_name}
          keyboardType='default'
          returnKeyType="next"
          placeholder='First Name'
          placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          value = {this.state.last_name}
          keyboardType='default'
          returnKeyType="next"
          placeholder='Last Name'
          placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {input}
          ref={(input)=> this.passwordInput = input}
          returnKeyType="next"
          placeholder='Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry/>

          <TextInput style = {input}
          ref={(input)=> this.passwordInput = input}
          returnKeyType="next"
          placeholder='Repeat Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry/>

          <Button> Register </Button>
        </View>

      </View>
    );
  }
}

export default SignupForm

const styles = StyleSheet.create ({
  container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: '#BC8335',
        marginBottom: 10,
        padding: 10
    },
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    },
    backgroundImage: {
      position: 'absolute',
      flex: 1,
      height: Dimensions.get('window').height + 30,
      resizeMode: 'cover',
    },
    logo: {
      width: 180,
      height: 180,
      marginTop: 30
    }
});
