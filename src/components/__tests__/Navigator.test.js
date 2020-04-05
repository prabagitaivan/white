import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../stores'
import Styles from '../../styles'
import Navigator from '../Navigator'
import * as emoji from '../../libraries/emoji'

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
      const { getByText, getByTitle } = renderNavigator()
      expect(getByText('Random Notes')).toBeInTheDocument()
      expect(getByTitle('Random Notes')).toMatchSnapshot()
      expect(getByTitle('Repository')).toMatchSnapshot()
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
      jest.spyOn(emoji, 'getRandomEmoji')
    })
    afterEach(() => {
      window.open.mockRestore()
      emoji.getRandomEmoji.mockRestore()
    })

    it('open this repository when click the Repository', () => {
      const { getByTitle } = renderNavigator()
      const repo = getByTitle('Repository')

      userEvent.click(repo)
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/prabagitaivan/white'
      )
    })
    it('random emoji when click the Emoji avatar', () => {
      const { getByRole } = renderNavigator()
      const avatar = getByRole('img')

      userEvent.click(avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(1)

      userEvent.click(avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(2)
    })
  })
})
