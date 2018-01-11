import React, {Component} from "react";
import { Text, Image, View, Alert, AsyncStorage } from "react-native";
import { Container, Button, Content, List, ListItem, Left, Body, Right } from "native-base";

class SideBar extends Component {
  render() {
    return (
      <Container>
          <Content style={{ backgroundColor: "#e5be42" }}>
                  <List>
                    <ListItem style = {{backgroundColor: 'transparent', marginLeft: 15}}>
                      <View>
                        <Text style = {{ marginTop: 30, color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}> Home </Text>
                        <Text style = {{ marginTop: 30, color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}> Record </Text>
                        <Text style = {{ marginTop: 30, color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}> About Us </Text>
                        <Text style = {{ marginTop: 30, color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}> Logout </Text>
                      </View>
                    </ListItem>
                  </List>

          </Content>
      </Container>
    );
  }
}

export default SideBar;
