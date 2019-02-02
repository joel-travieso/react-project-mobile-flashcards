import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { purple, white, globalStyles } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'

class AddDeck extends Component {
  state = {
    title: '',
    questions: []
  }

  submit = () => {
    const uuidv4 = require('uuid/v4')
    const key = uuidv4()
    const deck = this.state

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState(() => ({ title: '' }))

    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: key }
    )

    saveDeck({ deck, key })

    // clearLocalNotification()
    //   .then(setLocalNotification)
  }

  render() {
    return (
      <View>
        <TextInput
          style={globalStyles.textInput}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title} 
          placeholder="Deck Title"/>
        <TextButton 
          style={globalStyles.submitBtn}
          onPress={this.submit}>
          Create Deck
        </TextButton>
      </View>
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(AddDeck)