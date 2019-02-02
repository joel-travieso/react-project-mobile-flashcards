import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, globalStyles } from '../utils/style'
import TextButton from './TextButton'

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Deck Details"
    }
  }

  render() {
    const { deck, count } = this.props

    return (
      <View style={globalStyles.container}>
        <Text>{deck.title}</Text>
        <Text>{count} cards</Text>
        <TextButton style={{margin: 20}} onPress={() => this.props.navigation.navigate(
          'AddCard',
          { deckId: deck.key }
        )}>
          Add Cards
        </TextButton>
        {count > 0 
          &&
            <TextButton style={{margin: 20}} onPress={() => this.props.navigation.navigate(
              'Quiz',
              { deckId: deck.key }
            )}>
              Start Quiz
            </TextButton>
        }
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: decks[deckId],
    count: decks[deckId]['questions'] ? decks[deckId]['questions'].length : 0
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)