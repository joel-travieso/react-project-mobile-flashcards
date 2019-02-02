import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { white, orange, gray, lightGray } from '../utils/style'

class DeckItem extends Component {
  state = {
    bounceValue: new Animated.Value(1),
  }

  select = () => {
    const { bounceValue } = this.state
    const { deckId, navigation } = this.props

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 100, toValue: 1.04, useNativeDriver:true}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4, useNativeDriver:true})
    ]).start(
      () => {
        navigation.navigate(
          'DeckDetail',
          { deckId }
        )
      }
    )
  }

  render() {
    const { deck, count } = this.props
    const { bounceValue } = this.state

    return (
      <TouchableOpacity onPress={this.select}>
        <Animated.View style={[styles.flatview, {transform: [{scale: bounceValue}]}]}>
          <Text style={styles.name}>{deck.title}</Text>
          <Text style={styles.count}>{count} cards</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  flatview: {
    justifyContent: 'center',
    borderRadius: 2,
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
  },
  name: {
    textAlign: 'center',
    fontSize: 22,
  },
  count: {
    color: gray,
    textAlign: 'center',
  },
})

function mapStateToProps (decks, { deckId }) {
  return {
    deck: decks[deckId],
    count: decks[deckId]['questions'] ? decks[deckId]['questions'].length : 0
  }
}

export default connect(
  mapStateToProps
)(DeckItem)