
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Title, Drawer, Content, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import SideBar from './SideBar';
import RiskGoldTab from '../Tabs/RiskGoldTab';
import EurTab from '../Tabs/EurTab';
import SilverTab from '../Tabs/SilverTab';
import SpxTab from '../Tabs/SpxTab';
import WtiTab from '../Tabs/WtiTab';
import DowTab from '../Tabs/DowTab';
import NasdaqTab from '../Tabs/NasdaqTab';

class HitRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
                  trendTab: false,
                  hitRateTab: false,
                  recordTab: false,
                  riskRateTab: true,
                  navigation: props.navigation,
                  categories: [],
                  selectedTab: "GOLD",
                };

    }

    componentWillMount() {
      axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=trade_api')
      .then(response => this.setState({categories: response.data.data}));
    }

    toggleTrendTab() {
      this.setState({
        trendTab: true,
        hitRateTab: false,
        recordTab: false,
        riskRateTab: false
      });
      this.state.navigation.navigate("HomeActivity", {screen: "HomeActivity"});
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
    }

  render() {
    const {footerStyle, tabStyle} = styles;

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return(
      <Drawer
      ref={ (ref) => { this.drawer = ref; } }
      content={ <SideBar navigator = {this.navigator} /> }
      onClose={() => closeDrawer()} >

        <Container>
          <View style = {{flex: 0.15}}>

            <View style = {tabStyle}>
              <Image style = {{flex: 1, resizeMode: "stretch"}} source = {require('../../components/Images/action_bar_bg.png')} />
            </View>

            <Header hasTabs style = {{backgroundColor: 'transparent'}} >
              <Left>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title> RISK RATIO </Title>
              </Body>
              <Right>
                <Button transparent >
                  <Icon name='share' />
                </Button>
              </Right>
            </Header>

        </View>

        <View style = {{flex: 1}}>
          <RiskGoldTab navigation = {this.props.navigation} />
        </View>

          <View style = {{flex: 0.1}}>

            <View style = {{position: 'absolute'}}>
                <Image style = {{flex: 1, resizeMode: "stretch"}} source = {require('../../components/Images/bottom_bar_bg.png')} />
            </View>

            <Footer style = {{backgroundColor: 'transparent'}}>
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

          </View>

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

export default HitRate
