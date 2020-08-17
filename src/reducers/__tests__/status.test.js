import reducers, { setConnection, setScreen, setTheme } from '../status'
import { getLightStatus } from '../../libraries/styles'

function setConnectionAction (online) {
  const state = reducers(undefined, {})
  return reducers(state, setConnection(online))
}
function setScreenAction (size) {
  const state = reducers(undefined, {})
  return reducers(state, setScreen(size))
}
function setThemeAction (light) {
  const state = reducers(undefined, {})
  return reducers(state, setTheme(light))
}

describe('reducers status', () => {
  it('return default state', () => {
    expect(reducers(undefined, {})).toEqual({
      online: true,
      desktop: true,
      light: getLightStatus(),
      page: 'Home'
    })
  })
  it('return correct actions', () => {
    expect(setConnection.toString()).toEqual('STATUS/SET_CONNECTION')
    expect(setScreen.toString()).toEqual('STATUS/SET_SCREEN')
    expect(setTheme.toString()).toEqual('STATUS/SET_THEME')
  })
  it('set for online status when set connection action called', () => {
    expect(setConnectionAction(true)).toMatchObject({ online: true })
    expect(setConnectionAction(false)).toMatchObject({ online: false })
  })
  it('set for desktop status when set screen action called', () => {
    expect(setScreenAction(1280)).toMatchObject({ desktop: true })
    expect(setScreenAction(1024)).toMatchObject({ desktop: true })
    expect(setScreenAction(768)).toMatchObject({ desktop: true })
    expect(setScreenAction(600)).toMatchObject({ desktop: false })
    expect(setScreenAction(480)).toMatchObject({ desktop: false })
    expect(setScreenAction(360)).toMatchObject({ desktop: false })
  })
  it('set for light status when set theme action called', () => {
    expect(setThemeAction(true)).toMatchObject({ light: true })
    expect(setThemeAction(false)).toMatchObject({ light: false })
  })
})
