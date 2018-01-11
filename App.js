/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './src/components/Login/Login';
import SignupForm from './src/components/Login/SignupForm';
import HomeActivity from './src/components/Home/HomeActivity';
import HitRate from './src/components/Home/HitRate';
import RiskRatio from './src/components/Home/RiskRatio';
import MyRecord from './src/components/Home/MyRecord';

const Apps = StackNavigator({
   HomeActivity: {screen: HomeActivity},
   Login: {screen: Login},
   SignupForm: {screen: SignupForm},
   RiskRatio: {screen: RiskRatio},
   MyRecord: {screen: MyRecord},
   HitRate: {screen: HitRate}
}, {
  headerMode: 'none'
})


export default class App extends Component {
  render() {
    return (
      <Apps />
    );
  }
}
