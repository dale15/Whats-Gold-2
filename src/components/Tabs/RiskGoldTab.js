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
                  <Text style = {{backgroundColor: 'transparent', color: '#e5be42', fontSize: 26, fontWeight: 'bold', marginTop: 20}}> RISK RATIO </Text>
                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <View style={{width: 100}} />

                  <Dropdown
                    label='Account Currency'
                    data={dataCurr}
                    containerStyle={{height: 70, marginLeft: 20, width: 320}}
                    pickerStyle={{backgroundColor: '#fff'}}
                    baseColor="#fff"
                    textColor="#fff"
                    itemColor="#000"
                    selectedItemColor="#000" />

                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{backgroundColor: 'transparent', color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Account Size </Text>

                  <TextInput style = {input}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholderTextColor='rgba(225,225,225,0.7)'/>

                </View>

                <View style = {{left: 0, flexDirection: 'row', marginTop: 20}}>
                  <Text style = {{backgroundColor: 'transparent', color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10, marginRight: 10}}> Risk Ratio, % </Text>

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
                  <Text style = {{backgroundColor: 'transparent', color: '#fff', marginLeft: 5, fontSize: 16, marginTop: 10}}> Stop Loss, pips </Text>

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
                  <View style={{width: 100}} />

                  <Dropdown
                    label='Currency Pair'
                    data={dataPair}
                    containerStyle={{height: 70, marginLeft: 20, width: 320, color: '#fff'}}
                    pickerStyle={{backgroundColor: '#fff', color: '#fff'}}
                    baseColor="#fff"
                    textColor="#fff"
                    itemColor="#000"
                    selectedItemColor="#000" />

                </View>

                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style = {{backgroundColor: 'transparent', width: 150, height: 50, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text> Calculate </Text>
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
    height: Dimensions.get("window").height - 40,
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
