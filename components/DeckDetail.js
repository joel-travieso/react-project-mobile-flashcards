import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

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