import { createActions, handleActions } from 'redux-actions'

const defaultState = {
  online: true,
  desktop: true
}

export const {
  status: { setConnection, setScreen }
} = createActions({
  STATUS: {
    SET_CONNECTION: action => action,
    SET_SCREEN: action => action
  }
})

export default handleActions(
  {
    [setConnection]: (state, { payload: online }) => ({ ...state, online }),
    [setScreen]: (state, { payload: size }) => ({
      ...state,
      desktop: size > 600
    })
  },
  defaultState
)
