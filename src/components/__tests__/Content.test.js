import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../stores'
import Styles from '../../styles'
import Content from '../Content'

function renderContent ({ desktop = true }) {
  const preloadedState = { status: { desktop, page: 'RandomNotes' } }
  const store = createStore(preloadedState)

  return render(
    <Provider store={store}>
      <Styles>
        <Content>test</Content>
      </Styles>
    </Provider>
  )
}

describe('components Content', () => {
  describe('snapshots', () => {
    it('contain children inside', () => {
      const { container, getByText } = renderContent({})
      const children = getByText('test')
      expect(container.firstChild).toContainElement(children)
    })
    it('return correct style for desktop', () => {
      const { container } = renderContent({})
      expect(container.firstChild).toHaveStyle(
        'position: fixed; top: -7.5px; bottom: -7.5px; padding-top: 80px; padding-bottom: 20px;'
      )
    })
    it('return correct style for mobile', () => {
      const { container } = renderContent({ desktop: false })
      expect(container.firstChild).toHaveStyle(
        'position: fixed; top: 7.5px; bottom: -30px; padding-top: 20px; padding-bottom: 80px;'
      )
    })
  })
})
