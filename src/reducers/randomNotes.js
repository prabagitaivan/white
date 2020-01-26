import { createActions, handleActions } from 'redux-actions'

const defaultState = {
  data: [],
  requesting: true,
  error: null
}

export const {
  randomNotes: { request, success, failure }
} = createActions({
  RANDOM_NOTES: {
    REQUEST: action => action,
    SUCCESS: action => action,
    FAILURE: action => action
  }
})

export default handleActions(
  {
    [request]: state => ({ ...state, requesting: true, error: null }),
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
