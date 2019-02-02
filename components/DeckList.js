import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white } from '../utils/colors'
import DeckItem from './DeckItem'
import { AppLoading} from 'expo'


class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { items, navigation } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    
    return (
      <View>
        <FlatList
          data={items}
          renderItem={
            (deck) => (
              <DeckItem key={deck.item.key} deckId={deck.item.key} navigation={navigation}/>
            )
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps (decks) {
  return {
    items: Object.keys(decks).map(function(key) {
      const result = decks[key]
      result['key'] = key
      result['count'] = result['questions'] ? result['questions'].length : 0
      return result
    }),
  }
}

export default connect(
  mapStateToProps,
)(DeckList)