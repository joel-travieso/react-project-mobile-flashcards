import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, orange, green, red, globalStyles } from '../utils/style'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'

class Quiz extends Component {
  state = {
    index: 0,
    reveal:false,
    correct: 0,
    incorrect: 0,
    percentage: 0
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    }
  }

  handleResponse = (isCorrect) => {
    const { count } = this.props
    newState = { 
      correct: isCorrect ? this.state.correct + 1 : this.state.correct,
      incorrect: isCorrect ? this.state.incorrect : this.state.incorrect + 1,
      index: this.state.index + 1,
      reveal:false,
    }
    newState.percentage = Math.round((newState.correct * 100) / (newState.index))
    this.setState(() => (newState))

    if (newState.index == count) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  handleReveal = () => {
    this.setState(() => ({ 
      reveal: !this.state.reveal,
    }))
  }

  handleReset = () => {
    this.setState(() => ({ 
      index: 0,
      reveal:false,
      correct: 0,
      incorrect: 0,
      percentage: 0
    }))
  }

  toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { deck, count } = this.props

    console.log(this.state)

    return (
      <View style={globalStyles.container}>
        {this.state.index < count
          ? (<View>
              <Text style={{ textAlign: 'center'}}>Question {this.state.index + 1} of {count}</Text>
              <Text style={{ marginTop: 100, fontSize: 30, textAlign: 'center'}}>{deck.questions[this.state.index].question}</Text>
              <View style={styles.section}>
                {this.state.reveal 
                  ? <Text>{deck.questions[this.state.index].answer}</Text>
                  : <TextButton style={{backgroundColor: white, color: orange}} textStyle={{color: 'orange'}} onPress={this.handleReveal}>Reveal</TextButton>
                }
              </View>
              <View style={styles.section}>
                <TextButton style={{ backgroundColor: green}} onPress={() => this.handleResponse(true)} >
                  Correct
                </TextButton>
                <TextButton style={{ backgroundColor: red}} onPress={() => this.handleResponse(false)}>
                  Incorrect
                </TextButton>
              </View>
            </View>)
          : (<View>
              <Text style={{ textAlign: 'center', fontSize: 20}}>Correct: {this.state.correct} of {this.state.index} ({this.state.percentage}%)</Text>
              <View style={styles.section}>
                <TextButton style={{margin: 20}} onPress={this.handleReset}>
                  Reset
                </TextButton>
                <TextButton style={{margin: 20}} onPress={this.toDeckDetail}>
                  Back to Deck
                </TextButton>
              </View>
            </View>)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
)(Quiz)