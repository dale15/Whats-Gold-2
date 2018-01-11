import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({onPress, children}) => {

  return(
    <TouchableOpacity
            style = {styles.buttonContainer} 
            onPress = {onPress}
    >
              <Text style={styles.buttonText}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  buttonContainer: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      marginBottom: 10
  },
  buttonText: {
      color: '#BC8335',
      textAlign: 'center',
      fontWeight: '700'
  }
});

export default Button;
