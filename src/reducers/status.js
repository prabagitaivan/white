import { createActions, handleActions } from 'redux-actions'
import { getLightStatus } from '../libraries/styles'

const defaultState = {
  online: true,
  desktop: true,
  light: getLightStatus(),
  page: 'Home'
}

export const {
  status: { setConnection, setScreen, setTheme }
} = createActions({
  STATUS: {
    SET_CONNECTION: action => action,
    SET_SCREEN: action => action,
    SET_THEME: action => action
  }
})

export default handleActions(
  {
    [setConnection]: (state, { payload: online }) => ({ ...state, online }),
    [setScreen]: (state, { payload: size }) => ({
      ...state,
      desktop: size > 600
    }),
    [setTheme]: (state, { payload: light }) => ({ ...state, light })
  },
  defaultState
)
