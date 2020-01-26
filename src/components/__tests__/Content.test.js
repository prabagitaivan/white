import { render, getByText } from '@testing-library/react'
import React from 'react'
import Stores from '../../stores'
import Styles from '../../styles'
import Content from '../Content'

function renderContent (desktop = true) {
  const preloadedState = { status: { desktop } }

  return render(
    <Stores preloadedState={preloadedState}>
      <Styles>
        <Content>test content</Content>
      </Styles>
    </Stores>
  )
}

describe('components Content', () => {
  describe('snapshots', () => {
    it('contain children inside', () => {
      const { container } = renderContent()
      const children = getByText(container, 'test content')
      expect(container.firstChild).toContainElement(children)
    })
    it('return correct style for desktop', () => {
      const { container } = renderContent()
      expect(container.firstChild).toHaveStyle(
        'padding-top: 85px; padding-bottom: 20px;'
      )
    })
    it('return correct style for mobile', () => {
      const { container } = renderContent(false)
      expect(container.firstChild).toHaveStyle(
        'padding-top: 15px; padding-bottom: 80px;'
      )
    })
  })
})
