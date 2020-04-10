import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import { Container as MuiContainer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import createStore from '../stores'
import Styles from '../styles'
import * as themes from '../styles/themes'
import { getLightStatus } from '../styles/libraries'

describe('main Styles', () => {
  describe('configuration', () => {
    it('return global css', () => {
      const file = path.join(__dirname, '/../styles/global.css')
      const globalCss = fs.readFileSync(file).toString()
      expect(globalCss).toMatchSnapshot()
    })
    it('return light theme configuration', () => {
      expect(themes.light).toMatchSnapshot()
    })
    it('return dark theme configuration', () => {
      expect(themes.dark).toMatchSnapshot()
    })
  })
  describe('libraries', () => {
    const resetDate = Date
    const store = createStore()

    function mockGetLightStatus (hour) {
      global.Date = jest.fn(() => ({
        getHours: jest.fn().mockReturnValue(hour)
      }))

      return getLightStatus()
    }

    afterEach(() => {
      global.Date = resetDate
    })

    it('return correct class name for material ui', () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <Styles>
            <MuiContainer data-testid='data'>test</MuiContainer>
          </Styles>
        </Provider>
      )

      expect(getByTestId('data')).toHaveClass(
        'MuiContainer-root MuiContainer-maxWidthLg'
      )
    })
    it('return correct class name for created style', () => {
      const useStyles = makeStyles(
        {
          root: { display: 'block' },
          maxWidthLg: { width: '100%' }
        },
        { name: 'Container' }
      )
      const Container = ({ children }) => {
        const classes = useStyles()
        return (
          <div
            data-testid='data'
            className={`${classes.root} ${classes.maxWidthLg}`}
          >
            {children}
          </div>
        )
      }
      const { getByTestId } = render(
        <Provider store={store}>
          <Styles>
            <Container>test</Container>
          </Styles>
        </Provider>
      )

      expect(getByTestId('data')).toHaveClass(
        'WhiteContainer-root WhiteContainer-maxWidthLg'
      )
    })
    it('get light status based on hour time', () => {
      expect(mockGetLightStatus(0)).toEqual(false)
      expect(mockGetLightStatus(3)).toEqual(false)
      expect(mockGetLightStatus(6)).toEqual(true)
      expect(mockGetLightStatus(9)).toEqual(true)
      expect(mockGetLightStatus(12)).toEqual(true)
      expect(mockGetLightStatus(15)).toEqual(true)
      expect(mockGetLightStatus(18)).toEqual(false)
      expect(mockGetLightStatus(21)).toEqual(false)
    })
    it('return correct theme for light status', () => {
      const preloadedState = { status: { light: true } }
      const store = createStore(preloadedState)
      const useStyles = makeStyles(theme => ({
        root: {
          backgroundColor: theme.palette.background.default
        }
      }))
      const Light = () => {
        const classes = useStyles()
        return <div className={classes.root}>test</div>
      }

      const { container } = render(
        <Provider store={store}>
          <Styles>
            <Light />
          </Styles>
        </Provider>
      )
      expect(container.firstChild).toHaveStyle(
        `background-color: ${themes.light.palette.background.default};`
      )
    })
    it('return correct theme for dark status', () => {
      const preloadedState = { status: { light: false } }
      const store = createStore(preloadedState)
      const useStyles = makeStyles(theme => ({
        root: {
          backgroundColor: theme.palette.background.default
        }
      }))
      const Dark = () => {
        const classes = useStyles()
        return <div className={classes.root}>test</div>
      }

      const { container } = render(
        <Provider store={store}>
          <Styles>
            <Dark />
          </Styles>
        </Provider>
      )
      expect(container.firstChild).toHaveStyle(
        `background-color: ${themes.dark.palette.background.default};`
      )
    })
  })
})
