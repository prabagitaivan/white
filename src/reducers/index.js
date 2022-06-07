import { combineReducers } from '@reduxjs/toolkit'
import status from './status'
import randomNotes from './randomNotes'
import treeBookmarks from './treeBookmarks'

const reducers = combineReducers({
  status,
  randomNotes,
  treeBookmarks
})

export default reducers
