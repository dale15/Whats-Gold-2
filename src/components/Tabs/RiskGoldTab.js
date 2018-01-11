import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated, Easing, TextInput} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Title, Drawer, Content, Footer, FooterTab } from 'native-base';
import { ButtonGroup, Button } from 'react-native-elements'


class RiskGoldTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      navigation: props.navigation,
    }
    this.updateIndex = this.updateIndex.bind(this);
    this.RotateValueHolder = new Animated.Value(0);

  }

  componentDidMount() {
   this.StartImageRotateFunction();
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0)

    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear
      }
    ).start();

  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  callMoneyTab() {

  }

  callUnitTab() {

  }

  callLotTab() {

  }

  render() {
    const buttons = ['3-7 days' , '7-15 days', '30 days', '90 days', '1 year'];
    const {mainContainer, leftRedBearStyle, rightGreenBullStyle, midContainer, input} = styles;

    return(
      <Container>
      <View style = {{flex: 1, flexDirection: 'column'}}>

        <ImageBackground
          resizeMode = 'cover'
          source = {require('../../components/Images/bg_new.png')}
          style = {mainContainer}>

            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
              <Text style = {{color: '#e5be42', fontSize: 26, fontWeight: 'bold'}}> RISK RATIO </Text>
            </View>

            <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
              <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Amount Size </Text>

              <TextInput style = {input}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholderTextColor='rgba(225,225,225,0.7)'/>

            </View>

            <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
              <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Risk Ratio </Text>

              <TextInput style = {{width: 200,
              height: 35,
              backgroundColor: '#fff',
              marginLeft: 25}}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholderTextColor='rgba(225,225,225,0.7)'/>

            </View>

            <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
              <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Stop Loss </Text>

              <TextInput style = {{width: 200,
              height: 35,
              backgroundColor: '#fff',
              marginLeft: 25}}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholderTextColor='rgba(225,225,225,0.7)'/>

            </View>

            <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
              <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Index </Text>
            </View>

            <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity>
                <Image source = {require('../../components/Images/risk_money.png')} style = {{width: 100, height: 50, resizeMode: 'contain', marginRight: 10, marginLeft: 10}} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../../components/Images/risk_unit.png')} style = {{width: 100, height: 50, resizeMode: 'contain'}} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../../components/Images/risk_lot.png')} style = {{width: 100, height: 50, resizeMode: 'contain', marginLeft: 10}} />
              </TouchableOpacity>
            </View>

        </ImageBackground>

      </View>
      </Container>

    )
  }
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  leftRedBearStyle: {
    position: 'absolute',
    flex: 1,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 15,
    marginTop: 10
  },
  rightGreenBullStyle: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 0,
    right: 0,
    marginRight: 20,
    marginTop: 10,
  },
  midContainer: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  input:{
    width: 200,
    height: 35,
    backgroundColor: '#fff',
    marginLeft: 10
  },
});

export default RiskGoldTab;
