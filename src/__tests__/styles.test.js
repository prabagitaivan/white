import { render, getByTestId } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { Container as MuiContainer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Styles from '../styles'
import theme from '../styles/theme'

describe('main Styles', () => {
  describe('configuration', () => {
    it('return global css', () => {
      const file = path.join(__dirname, '/../styles/global.css')
      const globalCss = fs.readFileSync(file).toString()
      expect(globalCss).toMatchSnapshot()
    })
    it('return theme configuration', () => {
      expect(theme).toMatchSnapshot()
    })
  })
  describe('libraries', () => {
    it('return correct class name for material ui', () => {
      const { container } = render(
        <Styles>
          <MuiContainer data-testid='data'>test</MuiContainer>
        </Styles>
      )

      expect(getByTestId(container, 'data')).toHaveClass(
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
      const { container } = render(
        <Styles>
          <Container>test</Container>
        </Styles>
      )

      expect(getByTestId(container, 'data')).toHaveClass(
        'WhiteContainer-root WhiteContainer-maxWidthLg'
      )
    })
  })
})
