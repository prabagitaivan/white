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

describe('layouts Home', () => {
  describe('snapshots', () => {
    it('contain navigator', () => {
      const { container } = renderHome()
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain correct content', () => {
      const { container } = renderHome()
      const Content = container.querySelector('#content')
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
  })
})
