import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
import Dimensions from 'Dimensions';

class Login extends Component {
  render() {
    const {container, loginContainer, formContainer, logo, backgroundImage} = styles;
    const {navigate} = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style = {container}>

          <View style = {loginContainer}>
            <Image style = {backgroundImage} source = {require('../../components/Images/bg.png') }/>
            <Image resizeMode="contain" style = {logo} source = {require('../../components/Images/black_logo.png') }/>
          </View>

        <View style = {formContainer}>
          <LoginForm navigateKey = {this.props.navigation} />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default Login

const styles = StyleSheet.create ({
    container: {
      flex: 1
    },
    loginContainer: {
      alignItems: 'center',
      flexGrow: 1
    },
    formContainer: {
      marginBottom: 250
    },
    backgroundImage: {
      position: 'absolute',
      height: Dimensions.get('window').height + 30,
      resizeMode: 'cover',
    },
    logo: {
      width: 180,
      height: 180,
      marginTop: 30
    }
});
