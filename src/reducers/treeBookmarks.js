import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  requesting: true,
  error: null
}

const slice = createSlice({
  name: 'treeBookmarks',
  initialState,
  reducers: {
    request: state => ({ ...state, requesting: true, error: null }),
    success: (state, { payload: data = {} }) => ({
      ...state,
      data,
      requesting: false,
      error: null
    }),
    failure: (state, { payload: error = 'error' }) => ({
      ...state,
      requesting: false,
      error
    })
  }
})

export const { request, success, failure } = slice.actions

export default slice.reducer
