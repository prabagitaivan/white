import { createSlice } from '@reduxjs/toolkit'
import { isLightMode, isMacPlatform } from '../libraries/status'

const initialState = {
  online: true,
  desktop: true,
  mac: isMacPlatform(),
  light: isLightMode(),
  page: 'RandomNotes'
}

const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setConnection: (state, { payload: online }) => ({ ...state, online }),
    setScreen: (state, { payload: size }) => ({
      ...state,
      desktop: size > 600
    }),
    setTheme: (state, { payload: light }) => ({ ...state, light }),
    setPage: (state, { payload: page }) => ({ ...state, page })
  }
})

export const { setConnection, setScreen, setTheme, setPage } = slice.actions

export default slice.reducer
