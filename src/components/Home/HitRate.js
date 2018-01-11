
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Title, Drawer, Content, Footer, FooterTab, List, ListItem } from 'native-base';
import axios from 'axios';
import SideBar from './SideBar';
import HitRateList from './HitRateList';

class HitRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
            hitrates: [],
            hitrateAll: [],
            trendTab: false,
            hitRateTab: true,
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
      this.state.navigation.navigate("HomeActivity", {screen: "HomeActivity"});
    }

    toggleHitRateTab() {
      this.setState({
        trendTab: false,
        hitRateTab: true,
        recordTab: false,
        riskRateTab: false,
        hitrates: []
      });
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
      axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=hitrate')
      .then(response => {
          this.setState( { hitrates: response.data.data } )
        }
      );

      axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=hitrate')
      .then(response => {
          this.setState( { hitrateAll: response.data.all } )
        }
      );

    }

  render() {
    const {footerStyle, tabStyle, textHitRateStyle} = styles;

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
                <Button transparent onPress = {() => openDrawer()} >
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title> OUR RECORD </Title>
              </Body>
              <Right>
                <Button transparent >
                  <Icon name='share' />
                </Button>
              </Right>
            </Header>
          </View>

              <View style = {{alignItems: 'center', flex:1}}>

                <View>
                  { this.state.hitrates &&
                    <HitRateList datas = {this.state.hitrates} allDatas = {this.state.hitrateAll} />
                  }
                </View>

              </View>

              <View style = {{flex: 0.10}}>

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
    },

    textHitRateStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 30,
      marginTop: 5,
      marginBottom: 5
    }
});

export default HitRate
