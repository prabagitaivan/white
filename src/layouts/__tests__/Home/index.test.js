import { render } from '@testing-library/react'
import React from 'react'
import Home from '../../Home'

describe('Home', () => {
  describe('snapshots', () => {
    it('contain correct content', () => {
      const { container } = render(<Home />)
      expect(container.querySelector('#content')).toMatchSnapshot()
    })
  })
})
