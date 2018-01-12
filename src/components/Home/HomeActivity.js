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
              <Image style = {{resizeMode: "stretch", position: 'absolute', height: 150}} source = {require('../../components/Images/action_bar_bg.png')} />

              <Header hasTabs style = {{backgroundColor: 'transparent'}} >
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
              </Header>

              <View style = {{flex: 0.03, flexDirection: 'row'}}>
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
              </View>

              <View style = {{flex: 0.03, flexDirection: 'row', marginTop: 20, paddingBottom: 10}}>
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
              </View>

              <View style = {{flex: 1}}>
                {this.state.selectedTab === "GOLD" &&
                  <GoldTab navigation = {this.props.navigation} />
                }

                {this.state.selectedTab === "SILVER" &&
                  <SilverTab />
                }

                {this.state.selectedTab === "WTI CRUDE" &&
                  <WtiTab />
                }

                {this.state.selectedTab === "DOW JONES" &&
                  <DowTab />
                }

                {this.state.selectedTab === "EUR/USD" &&
                  <EurTab />
                }

                {this.state.selectedTab === "SPX" &&
                  <SpxTab />
                }

                {this.state.selectedTab === "NASDAQ" &&
                  <NasdaqTab />
                }
              </View>

              <Image style = {{resizeMode: "stretch", position: 'absolute', bottom: 0, height: 55}} source = {require('../../components/Images/bottom_bar_bg.png')} />

              <Footer style = {{backgroundColor: 'transparent', position: 'absolute', bottom: 0}}>
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
              </Footer>

          </Container>

      </Drawer>
    );
  }
}

const styles = StyleSheet.create ({
    tabStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    footerStyle: {
      backgroundColor: "transparent"
    }
});

export default HomeActivity
