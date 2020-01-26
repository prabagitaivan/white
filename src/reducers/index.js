import { combineReducers } from 'redux'
import status from './status'
import randomNotes from './randomNotes'

const reducers = combineReducers({
  status,
  randomNotes
})

export default reducers
