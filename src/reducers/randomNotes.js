import { createActions, handleActions } from 'redux-actions'

const defaultState = {
  data: [],
  requesting: true,
  error: null
}

export const {
  randomNotes: { request, edit, success, failure }
} = createActions({
  RANDOM_NOTES: {
    REQUEST: action => action,
    EDIT: action => action,
    SUCCESS: action => action,
    FAILURE: action => action
  }
})

export default handleActions(
  {
    [request]: state => ({ ...state, requesting: true, error: null }),
    [edit]: (state, { payload: data = [] }) => ({ ...state, data }),
    [success]: (state, { payload: data = [] }) => ({
      ...state,
      data,
      requesting: false,
      error: null
    }),
    [failure]: (state, { payload: error = 'error' }) => ({
      ...state,
      requesting: false,
      error
    })
  },
  defaultState
)
