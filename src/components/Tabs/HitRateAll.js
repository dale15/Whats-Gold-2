
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {Container, Content, List, ListItem} from 'native-base';

class HitRateAll extends Component {

  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    console.log(this.props.allData);
    const {backgroundImage, container, viewStyle, textStyle} = styles;

    return(
      <View>
        <List>
          { this.props.allData.map(data => (
                <ListItem key = {data.id} style = {{backgroundColor: 'transparent', marginRight: 15}}>
                  <View>
                    <Text style = {{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}> {data.date} </Text>
                    <View style = {viewStyle}>
                      <Text style = { textStyle }> {data.id} </Text>
                      <Text style = { textStyle }> {data.entrypoint} </Text>
                      <Text style = { textStyle }> {data.closepoint} </Text>
                    </View>
                  </View>
                </ListItem>
            ))
          }
        </List>
    </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  backgroundImage: {
    position: 'relative',
    flexGrow: 1
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
  }
});

export default HitRateAll
