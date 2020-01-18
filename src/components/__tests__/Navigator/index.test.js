import {
  render,
  getByText,
  getByTitle,
  getByRole
} from '@testing-library/react'
import React from 'react'
import Stores from '../../../stores'
import Styles from '../../../styles'
import Navigator from '../../Navigator'

function renderNavigator (desktop = true) {
  const preloadedState = { status: { desktop } }

  return render(
    <Stores preloadedState={preloadedState}>
      <Styles>
        <Navigator />
      </Styles>
    </Stores>
  )
}

describe('Navigator', () => {
  describe('snapshots', () => {
    it('contain random notes and its icon', () => {
      const { container } = renderNavigator()
      expect(getByText(container, 'Random Notes')).toBeInTheDocument()
      expect(getByTitle(container, 'Random Notes')).toMatchSnapshot()
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
})
