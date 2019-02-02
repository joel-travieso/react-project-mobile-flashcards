import { AsyncStorage } from 'react-native'
import { formatResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'


export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatResults)
}

export function saveDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function saveCard ({ card, deckId }) {
  return getDecks()
  .then(
    (decks) => {
      const deck = decks[deckId]
      deck.questions.push(card)
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckId]: deck
      }))
    }
	)
}
