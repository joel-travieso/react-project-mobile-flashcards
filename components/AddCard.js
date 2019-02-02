import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, TextInput } from 'react-native'
import { saveCard } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { orange, white, globalStyles } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Cards"
    }
  }

  submit = () => {
    const card = this.state
    const { deckId } = this.props

    this.props.dispatch(addCard({deckId, card}))

    this.setState(() => ({ question: '', answer: '' }))

    this.toHome()

    saveCard({ card, deckId })

    // clearLocalNotification()
    //   .then(setLocalNotification)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddCard'}))
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <TextInput
          style={globalStyles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question} 
          placeholder="Question"/>
        <TextInput
          style={globalStyles.textInput}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer} 
          placeholder="Answer" />
        <TextButton 
          style={globalStyles.submitBtn}
          onPress={this.submit}>
          Submit
        </TextButton>
      </View>
    );
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
  }
}

export default connect(
  mapStateToProps
)(AddCard)