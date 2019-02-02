import { StyleSheet } from 'react-native'

export const purple = '#292477'
export const gray = '#757575'
export const lightGray = '#f9f9f9'
export const white = '#fff'
export const red = '#b71845'
export const orange = '#f26f28'
export const blue = '#4e4cb8'
export const lightPurp = '#7c53c3'
export const pink = '#b93fb3'
export const green = '#2cba46'

export const globalStyles = StyleSheet.create({
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    margin: 15, 
    paddingLeft: 15
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  submitBtn: {
    alignSelf: 'flex-end',
  },
})
