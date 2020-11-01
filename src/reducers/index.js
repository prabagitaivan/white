import { combineReducers } from 'redux'
import status from './status'
import randomNotes from './randomNotes'
import treeBookmarks from './treeBookmarks'

const reducers = combineReducers({
  status,
  randomNotes,
  treeBookmarks
})

export default reducers
