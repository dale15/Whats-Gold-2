
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableHighlight, Animated, Easing} from 'react-native';
import axios from 'axios';
import {Container, Content} from 'native-base';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-native-elements'

class GoldTab extends Component {

  constructor(props) {
    super(props);

    this.state = { goldData: [],
                   fill: 35,
                   data: [],
                   selectedIndex: 0,
                };
      this.updateIndex = this.updateIndex.bind(this);

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
        duration: 3000,
        easing: Easing.linear
      }
    ).start();

  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentWillMount() {
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=latest_entrypoint_stoploss_closepoint_deta&category=DOW+JONES')
      .then(response => {
        this.setState( {goldData: response.data.data} );
      });

      axios.get('http://115.85.17.56/wg/api/get_latest_trade_alerts/dowjones')
       .then(response => {
         this.setState( {data: response.data} );
       });

  }

  render() {
    const size = 300;
    const width = 15;
    const cropDegree = 180;
    const buttons = ['3-7 days' , '7-15 days', '30 days', '90 days', '1 year'];
    const {mainContainer, leftRedBearStyle, rightGreenBullStyle, midContainer} = styles;
    let degree;

    if(this.state.selectedIndex == 0) {
      degree = 72;
      livePrice = 1288.88;
      this.StartImageRotateFunction();
    } else if(this.state.selectedIndex == 1) {
      degree = 100;
      livePrice = 1500.25;
      this.StartImageRotateFunction();
    } else if(this.state.selectedIndex == 2) {
      degree = 10;
      livePrice = 500;
      this.StartImageRotateFunction();
    } else if(this.state.selectedIndex == 3) {
      degree = 50;
      livePrice = 305.50;
      this.StartImageRotateFunction();
    } else if(this.state.selectedIndex == 4) {
      degree = 90;
      livePrice = 850;
      this.StartImageRotateFunction();
    }

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', degree+'deg']
    })

    return(
      <ImageBackground
        resizeMode = 'cover'
        source = {require('../../components/Images/bg_new.png')}
        style = {{flex: 4, flexDirection: 'column'}}>

        <View style = {{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}}>
          <Image style = {{flex: 0.2, resizeMode: 'contain', marginLeft: 10, marginTop: -20}} source = {require('../../components/Images/bear.png')} />

          <View style = {{flex: 1, flexDirection:'column', alignItems: 'center', justifyContent: 'space-around'}}>
            <Image style = {{flex: 0.8, resizeMode: 'contain', marginTop: 5}} source = {require('../../components/Images/barometer.png')}  />

            <Text style = {{flex: 0.05, position: 'absolute', color: "#fff", textAlign: 'center', marginTop: 40}}> {livePrice} </Text>

            <Text style = {{flex: 0.05, position: 'absolute', color: "#e5be42", marginTop: 60}}> Live Price </Text>

            <Animated.Image
              style = { {flex: 0.1, resizeMode: 'contain', marginTop: -25, transform: [{rotate: RotateData}] } }
              source = {require('../../components/Images/arrow.png')} />

          </View>

          <Image style = {{flex: 0.2, resizeMode: 'contain', marginRight: 10, marginTop: -20}} source = {require('../../components/Images/bull.png')} />
        </View>

        <View style = {{flex: 1, flexDirection:'column', alignItems: 'center'}}>
          <Image style = {{flex: 0.3, resizeMode: 'contain'}} source = {require('../../components/Images/arrow_handler.png')}  />
          <ButtonGroup
            onPress = {this.updateIndex}
            selectedIndex = {this.state.selectedIndex}
            buttons = {buttons}
            selectedBackgroundColor = 'gold'
            textStyle = {{color: '#e5be42', fontSize: 10}}
            containerStyle = {{flex: 0.1, backgroundColor: '#000'}}>
          </ButtonGroup>
        </View>

        <View style = {{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>

        </View>

        <View style = {{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}}>

        <View style = {{
              flex: 0.3,
              marginLeft: 30,
              borderRadius: 30,
              backgroundColor: 'green',
              transform: [ {scaleX: 2} ]}} >
                {this.state.data.map(datas => (
                    <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 12, marginTop: 10}}> { datas.entry_point }  </Text>
                  ))
                }
        </View>
        <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff', marginLeft: 20}}> Entry Point </Text>

        <View style = {{
              flex: 0.3,
              marginLeft: 30,
              borderRadius: 30,
              backgroundColor: 'gold',
              transform: [ {scaleX: 2} ]}} >
                {this.state.data.map(datas => (
                    <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 12, marginTop: 10}}> { datas.stop_loss }  </Text>
                  ))
                }
        </View>
        <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff', marginLeft: 20}}> Stop Loss </Text>

        <View style = {{
              flex: 0.3,
              marginLeft: 30,
              borderRadius: 30,
              backgroundColor: 'gold',
              transform: [ {scaleX: 2} ]}} >
                {this.state.data.map(datas => (
                    <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 12, marginTop: 10}}> { datas.profit_target    }  </Text>
                  ))
                }
        </View>
        <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff', marginLeft: 13}}> Profit Target </Text>

        <View style = {{position: 'absolute', flexDirection: 'row', alignItems: 'flex-end', bottom: -20, right: 0}}>
          <TouchableHighlight
            style = {{width: 50, height: 60, position: 'absolute', right: 130, bottom: 35}}
            onPress = { () => this.goBtnRiskRatio() }>
              <Image source = {require('../../components/Images/risk_ratio.png')} style = {{width: 50, height: 50, resizeMode: 'contain'}} />
          </TouchableHighlight>

          <ImageBackground
            style = {{width: 150, height: 200}}
            source = {require('../../components/Images/under_color.png') } >
              {this.state.data.map(datas => (
                    (datas.risk_ratio_level === "low") &&
                      <Image key = {datas.id} source = {require('../../components/Images/temp.png') } style = {{resizeMode: 'contain', width: 100, height: 100}} />
                     ||
                      <Image key = {datas.id} source = {require('../../components/Images/temp_high.png') } style = {{resizeMode: 'contain', width: 100, height: 100}} />
                  )
                )
              }

              <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 20}}> Risk Ratio </Text>
              <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 60, marginTop: 20, position: 'absolute',}}> High </Text>
              <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 60, marginTop: 60, position: 'absolute',}}> Low </Text>

              {this.state.data.map(datas =>
                <Button
                  key = {datas.id}
                  title={datas.risk_ratio}
                  buttonStyle = {{backgroundColor: '#e5be42', width: 80, height: 10}} />
                )
              }
          </ImageBackground>

        </View>

        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center'
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
    marginTop: 5,
  },
  midContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
  },
});

export default GoldTab
