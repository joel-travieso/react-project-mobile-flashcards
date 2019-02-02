import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white, globalStyles } from '../utils/colors'
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
      <View style={globalStyles.container}>
      {items.length > 0
        ? <FlatList
          data={items}
          renderItem={
            (deck) => (
              <DeckItem key={deck.item.key} deckId={deck.item.key} navigation={navigation}/>
            )
          } />
        : <Text style={styles.noDataText}>No decks available</Text>


      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
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