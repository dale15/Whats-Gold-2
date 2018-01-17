import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Container, Header,Left, Right, Body,Icon,Button,Title, Drawer, Content, Footer,FooterTab, Tab, Tabs, ScrollableTab, Segment } from 'native-base';
import SideBar from './SideBar';
import axios from 'axios';
import GoldTab from '../Tabs/GoldTab';
import EurTab from '../Tabs/EurTab';
import SilverTab from '../Tabs/SilverTab';
import SpxTab from '../Tabs/SpxTab';
import WtiTab from '../Tabs/WtiTab';
import DowTab from '../Tabs/DowTab';
import NasdaqTab from '../Tabs/NasdaqTab';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class HomeActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
                  categories: [],
                  selectedTab: "GOLD",
                  trendTab: true,
                  hitRateTab: false,
                  recordTab: false,
                  riskRateTab: false,
                  navigation: props.navigation
                };
  }

  toggleTrendTab() {
    this.setState({
      trendTab: true,
      hitRateTab: false,
      recordTab: false,
      riskRateTab: false
    });
  }

  toggleHitRateTab() {
    this.setState({
      trendTab: false,
      hitRateTab: true,
      recordTab: false,
      riskRateTab: false
    });
    this.state.navigation.navigate("HitRate", {navigation: this.state.navigation});
  }

  toggleRecordTab() {
    this.setState({
      trendTab: false,
      hitRateTab: false,
      recordTab: true,
      riskRateTab: false
    });
    this.state.navigation.navigate("MyRecord", {navigation: this.state.navigation});
  }

  toggleRiskRateTab() {
    this.setState({
      trendTab: false,
      hitRateTab: false,
      recordTab: false,
      riskRateTab: true
    });
    this.state.navigation.navigate("RiskRatio", {navigation: this.state.navigation});
  }

  componentWillMount() {
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=trade_api')
    .then(response => this.setState({categories: response.data.data}));

    console.disableYellowBox = true;
  }

  render() {
    const {footerStyle, tabStyle, container, backgroundImage} = styles;

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return (
      <Drawer
        ref={ (ref) => { this.drawer = ref; } }
        content={ <SideBar navigator = {this.navigator} /> }
        onClose={() => closeDrawer()}>

          <Container>
              {/* <Image style = {{resizeMode: "stretch", position: 'absolute', height: 80}} source = {require('../../components/Images/action_bar_bg.png')} /> */}
              <ImageBackground
                resizeMode = 'cover'
                source = {require('../Images/action_bar_bg.png')}
                style = {{backgroundColor: "#22140B", resizeMode: "stretch", height: 160, width: width}}>
                {/* <Header hasTabs style = {{backgroundColor: 'transparent'}} >
                  <Left>
                    <Button transparent>
                      <Icon name='menu' />
                    </Button>
                  </Left>
                  <Body>
                    <Title> TREND </Title>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Icon name='share' />
                    </Button>
                  </Right>
                </Header> */}
                {/* <View style={styles.headerButtonContainer}>
                  <View style={styles.headerButtonUpperContainer}>
                    <Text>Hello</Text>
                  </View>
                  <View style={styles.headerButtonLowerContainer}>
                   <Text>Hello</Text>
                  </View>
                </View> */}
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeftContainer}>
                    <Button transparent>
                      <Icon name='menu' style={{color: "#ffffff", fontSize: 30}} />
                    </Button>
                  </View>
                  <View style={styles.headerCenterContainer}>
                    <Title style = {{backgroundColor: 'transparent', color: "#ffffff"}}> TREND </Title>
                  </View>
                  <View style={styles.headerRightContainer}>
                    <Button transparent >
                      <Icon name='share' style={{color: "#ffffff", fontSize: 30}} />
                    </Button>
                  </View>
                </View>
                <View style={styles.upperCategoryContainer}>
                  {/* <TouchableOpacity
                      style = {{flex: 0.5, padding: 10, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                      key = {"GOLD"}
                      active  = { ("GOLD" == this.state.selectedTab ? true : false) }
                      onPress = { () => this.setState({selectedTab: "GOLD"}) }>
                    <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {"GOLD"} </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("GOLD" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "GOLD"}) }>
                    <Text style={styles.buttonText}>GOLD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("EUR" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "EURUSD"}) }>
                    <Text style={styles.buttonText}>EUR/USD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("WTI" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "WTICRUDE"}) }>
                    <Text style={styles.buttonText}>WTI CRUDE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("SILVER" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "SILVER"}) }>
                    <Text style={styles.buttonText}>SILVER</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomCategoryContainer}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("DOW" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "DOWJONES"}) }>
                    <Text style={styles.buttonText}>DOW JONES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("SPX" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "SPX"}) }>
                    <Text style={styles.buttonText}>SPX</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    active  = { ("NASDAQ" == this.state.selectedTab ? true : false) }
                    onPress = { () => this.setState({selectedTab: "NASDAQ"}) }>
                    <Text style={styles.buttonText}>NASDAQ</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              {/* <ImageBackground
                resizeMode = 'cover'
                source = {require('../../components/Images/action_bar_bg.png')}>
                <Text>Test</Text>
              </ImageBackground> */}
              {/* <View style = {{flex: 0.03, flexDirection: 'row'}}>
                {this.state.categories.map(cat => (
                      ( (cat.category == "GOLD" || cat.category == "EUR/USD" || cat.category == "WTI CRUDE" || cat.category == "SILVER") &&
                        <TouchableOpacity
                            style = {{flex: 0.5, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                            key = {cat.category}
                            active  = { (cat.category == this.state.selectedTab ? true : false) }
                            onPress = { () => this.setState({selectedTab: cat.category}) }>
                          <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {cat.category} </Text>
                        </TouchableOpacity>
                      )
                  ))
                }
              </View> */}
              {/* <ImageBackground
                resizeMode = 'cover'
                source = {require('../../components/Images/action_bar_bg.png')}> */}
                {/* <View style = {{flex: 0.03, flexDirection: 'row'}}>
                  <TouchableOpacity
                      style = {{flex: 0.5, padding: 10, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                      key = {"GOLD"}
                      active  = { ("GOLD" == this.state.selectedTab ? true : false) }
                      onPress = { () => this.setState({selectedTab: "GOLD"}) }>
                    <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {"GOLD"} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {{flex: 0.5, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                      key = {"EUR/USD"}
                      active  = { ("EUR/USD" == this.state.selectedTab ? true : false) }
                      onPress = { () => this.setState({selectedTab: "EUR/USD"}) }>
                    <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {"EUR/USD"} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {{flex: 0.5, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                      key = {"WTI CRUDE"}
                      active  = { ("WTI CRUDE" == this.state.selectedTab ? true : false) }
                      onPress = { () => this.setState({selectedTab: "WTI CRUDE"}) }>
                    <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {"WTI CRUDE"} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {{flex: 0.5, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                      key = {"SILVER"}
                      active  = { ("SILVER" == this.state.selectedTab ? true : false) }
                      onPress = { () => this.setState({selectedTab: "SILVER"}) }>
                    <Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 10}}> {"SILVER"} </Text>
                  </TouchableOpacity>
                </View> */}
              {/* </ImageBackground> */}

                  {/* <View style = {{flex: 0.03, flexDirection: 'row', marginTop: 20, paddingBottom: 10}}>
                      {this.state.categories.map(cat => (
                            ( (cat.category == "DOW JONES" || cat.category == "SPX" || cat.category == "NASDAQ") &&
                              <TouchableOpacity
                                  style = {{flex: 0.5, marginLeft: 5, marginRight: 10, backgroundColor: '#e5be42', justifyContent: 'center', alignItems: 'center'}}
                                  key = {cat.category}
                                  active  = { (cat.category == this.state.selectedTab ? true : false) }
                                  onPress = { () => this.setState({selectedTab: cat.category}) }>
                                <Text style = {{justifyContent: 'center', alignItems: 'center', fontSize: 10}}> {cat.category} </Text>
                              </TouchableOpacity>
                            )
                        ))
                      }
                  </View> */}

              <View style = {{flex: 1}}>
                {this.state.selectedTab === "SILVER" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "WTICRUDE" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "DOWJONES" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "EURUSD" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "SPX" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "NASDAQ" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }

                {this.state.selectedTab === "GOLD" &&
                  <GoldTab navigation = {this.props.navigation} tabSelected = {this.state.selectedTab} />
                }
              </View>

              {/* <Footer style = {{backgroundColor: 'transparent', position: 'absolute', bottom: 0}}>
                <FooterTab  style = {footerStyle}>
                  <Button active = {this.state.trendTab} onPress = { () => this.toggleTrendTab() }>
                    <Text>Trend</Text>
                  </Button >
                  <Button active = {this.state.hitRateTab} onPress = { () => this.toggleHitRateTab() } >
                    <Text>Our Record</Text>
                  </Button>
                  <Button active = {this.state.recordTab} onPress = { () => this.toggleRecordTab() }>
                    <Text>My Record</Text>
                  </Button>
                  <Button active = {this.state.riskRateTab} onPress = { () => this.toggleRiskRateTab() }>
                    <Text>Risk Ratio</Text>
                  </Button>
                </FooterTab>
              </Footer> */}

            <Footer style={styles.footer}>
              <FooterTab>
                <Image style = {{resizeMode: "stretch", position: 'absolute', bottom: 0, height: 55}} source = {require('../../components/Images/bottom_bar_bg.png')} />
                <Button active = {this.state.trendTab} onPress = { () => this.toggleTrendTab() }>
                  <Text>Trend</Text>
                </Button>
                <Button active = {this.state.hitRateTab} onPress = { () => this.toggleHitRateTab() } >
                  <Text>Our Record</Text>
                </Button>
                <Button active = {this.state.recordTab} onPress = { () => this.toggleRecordTab() }>
                  <Text>My Record</Text>
                </Button>
                <Button active = {this.state.riskRateTab} onPress = { () => this.toggleRiskRateTab() }>
                  <Text>Risk Ratio</Text>
                </Button>
              </FooterTab>
            </Footer>

          </Container>

      </Drawer>
    );
  }
}

const styles = StyleSheet.create ({
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 10
    },
    headerLeftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    headerCenterContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    upperCategoryContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
      paddingLeft: 10,
      paddingRight: 10
    },
    bottomCategoryContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 70,
      paddingRight: 70,
      marginBottom: 8
    },
    tabStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    footer: {
      backgroundColor: "transparent"
    },
    footerStyle: {
      backgroundColor: "transparent"
    },
    buttonCategoryContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerButtonContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerButtonUpperContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerButtonLowerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: '#e5be42',
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

export default HomeActivity
