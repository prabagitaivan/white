import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Container as MuiContainer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import createStore from '../../stores'
import Styles from '../../styles'
import { getLightStatus } from '../../libraries/styles'

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
    it('return light status based on hour time', () => {
      expect(mockGetLightStatus(0)).toEqual(false)
      expect(mockGetLightStatus(3)).toEqual(false)
      expect(mockGetLightStatus(6)).toEqual(true)
      expect(mockGetLightStatus(9)).toEqual(true)
      expect(mockGetLightStatus(12)).toEqual(true)
      expect(mockGetLightStatus(15)).toEqual(true)
      expect(mockGetLightStatus(18)).toEqual(false)
      expect(mockGetLightStatus(21)).toEqual(false)
    })
  })
})
