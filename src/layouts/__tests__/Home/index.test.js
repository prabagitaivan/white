import { render } from '@testing-library/react'
import React from 'react'
import Stores from '../../../stores'
import Styles from '../../../styles'
import Home from '../../Home'

function renderHome (desktop = true) {
  const preloadedState = { status: { desktop } }

  return render(
    <Stores preloadedState={preloadedState}>
      <Styles>
        <Home />
      </Styles>
    </Stores>
  )
}

describe('Home', () => {
  describe('snapshots', () => {
    it('contain correct content', () => {
      const { container } = renderHome()
      expect(container.querySelector('#content').firstChild).toMatchSnapshot()
    })
  })
})
