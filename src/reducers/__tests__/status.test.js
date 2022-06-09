import reducers, {
  setConnection,
  setScreen,
  setTheme,
  setPage
} from '../status'
import { isLightMode, isMacPlatform } from '../../libraries/status'

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
function setPageAction (page) {
  const state = reducers(undefined, {})
  return reducers(state, setPage(page))
}

describe('reducers status', () => {
  it('return default state', () => {
    expect(reducers(undefined, {})).toEqual({
      online: true,
      desktop: true,
      mac: isMacPlatform(),
      light: isLightMode(),
      page: 'RandomNotes'
    })
  })
  it('return correct actions', () => {
    expect(setConnection.toString()).toEqual('status/setConnection')
    expect(setScreen.toString()).toEqual('status/setScreen')
    expect(setTheme.toString()).toEqual('status/setTheme')
    expect(setPage.toString()).toEqual('status/setPage')
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
  it('set for page status when set page action called', () => {
    expect(setPageAction('TreeBookmarks')).toMatchObject({
      page: 'TreeBookmarks'
    })
    expect(setPageAction('RandomNotes')).toMatchObject({ page: 'RandomNotes' })
  })
})
