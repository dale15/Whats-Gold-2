import React, {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableHighlight, Animated, Easing, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Container, Content, H3, Text, Grid, Col, Row, Header} from 'native-base';
import { ButtonGroup, Button } from 'react-native-elements';
import Dimensions from 'Dimensions';

class GoldTab extends Component {

  constructor(props) {
    super(props);

    this.state = { goldData: [],
                   data: [],
                   selectedIndex: 0,
                   navigation: props.navigation,
                   selectedTabs: props.tabSelected,
                };
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

  goBtnRiskRatio() {
    this.state.navigation.navigate("RiskRatio", {navigation: this.state.navigation});
  }

  componentWillMount() {
      let category = "";

      if(this.state.selectedTabs === "EURUSD") {
        let category = "EUR/USD";
      } else if (this.state.selectedTabs === "DOWJONES") {
        let category = "DOW JONES";
      } else if (this.state.selectedTabs === "WTICRUDE") {
        let category = "WTI CRUDE";
      } else {
        let category = this.state.selectedTabs;
      }

      axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=latest_entrypoint_stoploss_closepoint_deta&category='+category)
      .then(response => {
        this.setState( {goldData: response.data.data} );
      });

      axios.get('http://115.85.17.56/wg/api/get_latest_trade_alerts/'+this.state.selectedTabs)
       .then(response => {
         this.setState( {data: response.data} );
       });

  }

  render() {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    const buttons = ['3-7 days' , '7-15 days', '30 days', '90 days', '1 year'];
    const {mainContainer, leftRedBearStyle, rightGreenBullStyle, midContainer} = styles;
    let degree;
    let livePrice;

    if(this.state.selectedIndex == 0) {
      degree = 140;
      livePrice = 1288.88;
      this.StartImageRotateFunction();
    } else if(this.state.selectedIndex == 1) {
      degree = 150;
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
      degree = 60;
      livePrice = 850;
      this.StartImageRotateFunction();
    }

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', degree+'deg']
    })

    return(
      <Container>
        <Content>

        <ImageBackground
          style={{backgroundColor: "#22140B"}}>

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

            <View style={styles.graphContainer}>
              <TouchableOpacity>
                <Image style = {{marginBottom: 5}} source = {require('../../components/Images/arrow_handler.png')}  />
              </TouchableOpacity>
              <ButtonGroup
                onPress = {this.updateIndex}
                selectedIndex = {this.state.selectedIndex}
                buttons = {buttons}
                selectedBackgroundColor = 'gold'
                textStyle = {{color: '#e5be42', fontSize: 10}}
                containerStyle = {{width: '90%', height: 20, backgroundColor: '#000'}}>
              </ButtonGroup>
            </View>

          <ImageBackground
          resizeMode = 'cover'
          source = {require('../../components/Images/bg_new.png')}
          style = {{flex: 1, backgroundColor: "#22140B"}}>

          <View style={styles.bottomContainer}>
            <View style={styles.ratioContainer}>
              <View style={styles.leftSideContainer}>
                <Image style={styles.underColorImage}
                        source = {require('../../components/Images/under_color.png') }/>
                <View style={styles.entryPointContainer}>
                  <View style = {{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        borderWidth: .5,
                        borderColor: 'yellow',
                        backgroundColor: 'green',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [ {scaleX: 1.6} ]}} >
                          {this.state.data.map(datas => (
                                <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 9, alignSelf: "center"}}> { datas.entry_point }  </Text>
                              ))
                            }
                  </View>
                  <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff', alignSelf: "center"}}> Entry Point </Text>
                </View>
                <View style={styles.stopLossContainer}>
                  <View style = {{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: 'gold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [ {scaleX: 1.6} ]}} >
                          {this.state.data.map(datas => (
                              <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 9, alignSelf: "center"}}> { datas.stop_loss }  </Text>
                            ))
                          }
                  </View>
                  <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff'}}> Stop Loss </Text>
                </View>
                <View style={styles.profitTargetContainer}>
                  <View style = {{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: 'gold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [ {scaleX: 1.6} ]}} >
                          {this.state.data.map(datas => (
                              <Text key = {datas.id} style = {{backgroundColor: 'transparent', fontSize: 9, alignSelf: "center"}}> { datas.profit_target }  </Text>
                            ))
                          }
                  </View>
                  <Text style = {{fontSize: 14, backgroundColor: 'transparent', color: '#fff'}}> Profit Target </Text>
                </View>
              </View>
              <View style={styles.rightSideContainer}>
                <Image style={styles.underColorImage}
                        source = {require('../../components/Images/under_color.png') } />
                <View style={styles.thermometerContainer}>
                  <View style={styles.thermometerIconContainer}>
                    <View style={styles.thermometerImageContainer}>
                      <Image
                        source = {require('../../components/Images/temp_high.png') } />
                    </View>
                    <View style={styles.thermometerHighLowContainer}>
                      <View style={styles.highContainer}>
                        <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 13}}>High</Text>
                      </View>
                      <View style={styles.lowContainer}>
                        <Text style={{color: '#fff', backgroundColor: 'transparent', fontSize: 13}}>Low</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.riskRatioContainer}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../components/Images/risk_ratio.png')}
                          style={{padding:0, margin:0}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>Risk Ratio</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </ImageBackground>
        </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  graphContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 176
  },
  underColorImage: {
    position: 'absolute',
    alignSelf: 'stretch',
  },
  ratioContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSideContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 7,
  },
  entryPointContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  stopLossContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  profitTargetContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  rightSideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  thermometerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thermometerIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  thermometerImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  thermometerHighLowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskRatioContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#EBC300',
    padding: 10,
    marginLeft: 3
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: "700"
  },
});

export default GoldTab
