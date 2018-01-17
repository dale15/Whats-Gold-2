import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated, Easing, TextInput} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Title, Drawer, Content, Footer, FooterTab, Button } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import Dimensions from 'Dimensions';


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

    let dataCurr = [{
      value: 'USD',
    }];

    let dataPair = [{
      value: 'EURUSD',
    }, {
      value: 'EURSGD',
    }, {
      value: 'EURNZD',
    }];

    return(
      <Container>
        <Content>
          <View style = {{flex: 1}}>
            <ImageBackground
              resizeMode = 'cover'
              source = {require('../../components/Images/bg_new.png')}
              style = {mainContainer}>

                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style = {{color: '#e5be42', fontSize: 26, fontWeight: 'bold', marginTop: 20}}> RISK RATIO </Text>
                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{color: '#fff', marginLeft: 5, fontSize: 14, justifyContent: 'center', alignItems: 'center', marginTop: 10}}> Account currency </Text>

                  <Dropdown
                    label='Account Currency'
                    data={dataCurr}
                    containerStyle={{height: 70, marginLeft: 20, width: 150}}
                    pickerStyle={{backgroundColor: '#fff'}}
                    baseColor="#fff"
                  />

                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Account Size </Text>

                  <TextInput style = {input}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholderTextColor='rgba(225,225,225,0.7)'/>

                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10, marginRight: 10}}> Risk Ratio, % </Text>

                  <TextInput style = {{flex: 1,
                  height: 35,
                  backgroundColor: '#fff',
                  marginLeft: 9, marginRight: 10}}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholderTextColor='rgba(225,225,225,0.7)'/>

                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Stop Loss, pips </Text>

                  <TextInput style = {{flex: 1,
                  height: 35,
                  backgroundColor: '#fff',
                  marginLeft: 8, marginRight: 10}}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholderTextColor='rgba(225,225,225,0.7)'/>
                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Currency pair </Text>

                  <Dropdown
                    label='Currency Pair'
                    data={dataPair}
                    containerStyle={{height: 70, marginLeft: 20, width: 150}}
                    pickerStyle={{backgroundColor: '#fff'}}
                    baseColor="#fff"
                  />

                </View>

                <View style = {{left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20}}>
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
        </Content>
      </Container>

    )
  }
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
  },
  midContainer: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  input:{
    flex: 1,
    width: 200,
    height: 35,
    backgroundColor: '#fff',
    marginLeft: 18,
    marginRight: 10
  },
});

export default RiskGoldTab;
