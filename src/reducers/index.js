import { combineReducers } from '@reduxjs/toolkit'
import status from './status'
import randomNotes from './randomNotes'
import treeBookmarks from './treeBookmarks'
import tapePlayers from './tapePlayers'

const reducers = combineReducers({
  status,
  randomNotes,
  treeBookmarks,
  tapePlayers
})

export default reducers
