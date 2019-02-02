import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { orange, white } from '../utils/style'

export default function TextButton ({ children, onPress, style = {}, textStyle = {} }) {
  return (
    <TouchableOpacity 
	  style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, style]}
	   onPress={onPress}>
      <Text 
    		style={[styles.btnText, textStyle]}>
      	{children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    margin: 15, 
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: white,
    fontSize: 14,
    textAlign: 'center',
  }
})