import { render } from '@testing-library/react'
import React from 'react'
import Stores from '../../../stores'
import Styles from '../../../styles'
import Home, { mapDispatchToProps as HomeReducers } from '../../Home'

function renderHome (desktop = true, randomNotes) {
  const preloadedState = { status: { desktop }, randomNotes }

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
    beforeEach(() => {
      jest.spyOn(HomeReducers, 'request').mockReturnValue({ type: '' })
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('contain navigator', () => {
      const { container } = renderHome()
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain loading content when requesting', () => {
      const { container } = renderHome()
      const Content = container.querySelector('#content')
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain empty content when requesting result is empty', () => {
      const { container } = renderHome(true, { requesting: false, data: [] })
      const Content = container.querySelector('#content')
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty', () => {
      const { container } = renderHome(true, {
        requesting: false,
        data: ['data']
      })
      const Content = container.querySelector('#content')
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
  })
  describe('mounting', () => {
    beforeEach(() => {
      jest.spyOn(HomeReducers, 'request')

      renderHome()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('request for random notes data after mount', () => {
      expect(HomeReducers.request).toHaveBeenCalledTimes(1)
    })
  })
})
