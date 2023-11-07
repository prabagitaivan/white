import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Container as MuiContainer } from '@mui/material'
import { makeStyles } from '@mui/styles'
import store from '../../stores'
import Styles from '../../styles'

describe('libraries styles', () => {
  describe('main', () => {
    it('return correct class name for material ui', () => {
      const { container } = render(
        <Provider store={store}>
          <Styles>
            <MuiContainer>test</MuiContainer>
          </Styles>
        </Provider>
      )

      expect(container.firstChild).toHaveClass(
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
          <div className={`${classes.root} ${classes.maxWidthLg}`}>
            {children}
          </div>
        )
      }
      const { container } = render(
        <Provider store={store}>
          <Styles>
            <Container>test</Container>
          </Styles>
        </Provider>
      )

      expect(container.firstChild).toHaveClass(
        'WhiteContainer-root WhiteContainer-maxWidthLg'
      )
    })
  })
})
