
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
                this.RotateValueHolder = new Animated.Value(0);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentWillMount() {
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=latest_entrypoint_stoploss_closepoint_deta&category=WTI+CRUDE')
      .then(response => {
        this.setState( {goldData: response.data.data} );
      });

      axios.get('http://115.85.17.56/wg/api/get_latest_trade_alerts/wticrude')
       .then(response => {
         this.setState( {data: response.data} );
       });

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
      <Container>

      <ImageBackground
        resizeMode = 'cover'
        source = {require('../../components/Images/bg_new.png')}
        style = {{flex: 1}}>
             <Content>
               <Grid>
                 <Col>
                   <Image style = {{width: 50, height: 50, resizeMode: 'contain', marginLeft: 10, marginTop: 20}} source = {require('../../components/Images/bear.png')} />
                 </Col>

                 <Col size={4}>
                   <View style = {{flexDirection:'column', alignItems: 'center', justifyContent: 'space-around'}}>
                     <Image style = {{width: 300, height: 200, resizeMode: 'contain'}} source = {require('../../components/Images/barometer.png')}  />

                     <Text style = {{flex: 0.05, position: 'absolute', color: "#fff", textAlign: 'center', marginTop: 40}}> {livePrice} </Text>

                     <Text style = {{flex: 0.05, position: 'absolute', color: "#e5be42", marginTop: 60}}> Live Price </Text>

                     <Animated.Image
                       style = { {width: 200, height: 200, marginTop: 70, position: 'absolute', resizeMode: 'contain', transform: [{rotate: RotateData}] } }
                       source = {require('../../components/Images/arrow.png')} />

                   </View>
                 </Col>

                 <Col>
                   <Image style = {{width: 50, height: 50,  resizeMode: 'contain', marginRight: 10, marginTop: 20}} source = {require('../../components/Images/bull.png')} />
                 </Col>
               </Grid>

               <Grid>
                 <Row size = {1}>
                   <View style = {{flex: 1, flexDirection:'column', alignItems: 'center'}}>
                     <Image style = {{width: 50, height: 50, resizeMode: 'contain'}} source = {require('../../components/Images/arrow_handler.png')}  />
                     <ButtonGroup
                       onPress = {this.updateIndex}
                       selectedIndex = {this.state.selectedIndex}
                       buttons = {buttons}
                       selectedBackgroundColor = 'gold'
                       textStyle = {{color: '#e5be42', fontSize: 10}}
                       containerStyle = {{width: '90%', height: 30, backgroundColor: '#000'}}>
                     </ButtonGroup>
                   </View>
                 </Row>
               </Grid>

               <Grid>
                <Col>

                  <View style = {{justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 100, paddingLeft: 30}}>
                    <View style = {{
                         width: 40,
                         height: 40,
                         marginLeft: 30,
                         borderRadius: 30,
                         backgroundColor: 'green',
                         alignItems: 'center',
                         justifyContent: 'center',
                         transform: [ {scaleX: 2} ]}} >
                           {this.state.data.map(datas => (
                                 <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 10}}> { datas.entry_point }  </Text>
                               ))
                             }
                    </View>
                    <Text style = {{fontSize: 16, backgroundColor: 'transparent', color: '#fff', marginLeft: 10, marginBottom: 10}}> Entry Point </Text>

                    <View style = {{
                          width: 40,
                          height: 40,
                          marginLeft: 30,
                          borderRadius: 30,
                          backgroundColor: 'gold',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: [ {scaleX: 2} ]}} >
                            {this.state.data.map(datas => (
                                <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 10}}> { datas.stop_loss }  </Text>
                              ))
                            }
                    </View>
                    <Text style = {{fontSize: 16, backgroundColor: 'transparent', color: '#fff', marginLeft: 10, marginBottom: 10}}> Stop Loss </Text>

                    <View style = {{
                          width: 40,
                          height: 40,
                          marginLeft: 30,
                          borderRadius: 30,
                          backgroundColor: 'gold',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: [ {scaleX: 2} ]}} >
                            {this.state.data.map(datas => (
                                <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 10}}> { datas.profit_target }  </Text>
                              ))
                            }
                    </View>
                    <Text style = {{fontSize: 16, backgroundColor: 'transparent', color: '#fff', marginLeft: 5}}> Profit Target </Text>
                  </View>

                </Col>

                <Col>
                  <TouchableHighlight
                    style = {{width: 50, height: 60,marginLeft: 50, marginTop: 230, position: 'absolute'}}
                    onPress = { () => this.goBtnRiskRatio() }>
                      <Image source = {require('../../components/Images/risk_ratio.png')} style = {{width: 50, height: 50, resizeMode: 'contain'}} />
                  </TouchableHighlight>

                  <ImageBackground
                    style = {{width: 150, height: 200, marginLeft: 70, marginTop: 100}}
                    source = {require('../../components/Images/under_color.png') } >
                      {this.state.data.map(datas => (
                            (datas.risk_ratio_level === "low") &&
                              <Image key = {datas.id} source = {require('../../components/Images/temp.png') } style = {{resizeMode: 'contain', width: 100, height: 100, marginLeft: 20}} />
                             ||
                              <Image key = {datas.id} source = {require('../../components/Images/temp_high.png') } style = {{resizeMode: 'contain', width: 100, height: 100, marginLeft: 20}} />
                          )
                        )
                      }

                      <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 35, marginTop: 10}}> Risk Ratio </Text>
                      <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 80, marginTop: 20, position: 'absolute',}}> High </Text>
                      <Text style = {{ backgroundColor: 'transparent', color: '#e5be42', marginLeft: 80, marginTop: 60, position: 'absolute',}}> Low </Text>

                      {this.state.data.map(datas =>
                        <Button
                          key = {datas.id}
                          title={datas.risk_ratio}
                          buttonStyle = {{backgroundColor: '#e5be42', width: 80, height: 10, marginLeft: 13, marginTop: 10}} />
                        )
                      }
                  </ImageBackground>
                </Col>

               </Grid>

             </Content>
        </ImageBackground>

      </Container>
    );
  }
}

const styles = StyleSheet.create ({
    mainContainer: {
      flex: 1,
      width: null,
      height: null,
      alignSelf: 'stretch'
    },
    leftRedBearStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
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
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10,
    },
});

export default GoldTab
