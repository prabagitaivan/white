import {
  render,
  getByText,
  getByTitle,
  getByRole
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../stores'
import Styles from '../../styles'
import Navigator from '../Navigator'

function renderNavigator (desktop = true) {
  const preloadedState = { status: { desktop } }
  const store = createStore(preloadedState)

  return render(
    <Provider store={store}>
      <Styles>
        <Navigator />
      </Styles>
    </Provider>
  )
}

describe('components Navigator', () => {
  describe('snapshots', () => {
    it('contain navigations and its icon', () => {
      const { container } = renderNavigator()
      expect(getByText(container, 'Random Notes')).toBeInTheDocument()
      expect(getByTitle(container, 'Random Notes')).toMatchSnapshot()
      expect(getByTitle(container, 'Repository')).toMatchSnapshot()
    })
    it('contain grin icon', () => {
      const { container } = renderNavigator()
      expect(getByRole(container, 'img')).toHaveTextContent('😁')
    })
    it('show in top for desktop', () => {
      const { container } = renderNavigator()
      expect(container.firstChild).toHaveStyle('top: 0px')
    })
    it('show in bottom for mobile', () => {
      const { container } = renderNavigator(false)
      expect(container.firstChild).toHaveStyle('bottom: 0px')
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      window.open.mockRestore()
    })

    it('open this repository when click the Repository', () => {
      const { container } = renderNavigator()
      const repo = getByTitle(container, 'Repository')

      userEvent.click(repo)
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/prabagitaivan/white'
      )
    })
  })
})
