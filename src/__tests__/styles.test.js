import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import createStore from '../stores'
import Styles from '../styles'
import * as themes from '../styles/themes'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  }
}))
const Container = () => {
  const classes = useStyles()
  return <div className={classes.root}>test</div>
}

describe('main Styles', () => {
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
  it('return correct theme for light status', () => {
    const preloadedState = { status: { light: true, page: 'Home' } }
    const store = createStore(preloadedState)

    const { container } = render(
      <Provider store={store}>
        <Styles>
          <Container />
        </Styles>
      </Provider>
    )
    expect(container.firstChild).toHaveStyle(
      `background-color: ${themes.light.palette.background.default};`
    )
  })
  it('return correct theme for dark status', () => {
    const preloadedState = { status: { light: false, page: 'Home' } }
    const store = createStore(preloadedState)

    const { container } = render(
      <Provider store={store}>
        <Styles>
          <Container />
        </Styles>
      </Provider>
    )
    expect(container.firstChild).toHaveStyle(
      `background-color: ${themes.dark.palette.background.default};`
    )
  })
})
