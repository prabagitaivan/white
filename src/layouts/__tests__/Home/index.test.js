import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    it('contain data content when requesting result is not empty in desktop', () => {
      const { container } = renderHome(true, {
        requesting: false,
        data: [
          {
            image: 'image',
            title: 'title',
            url: 'url',
            active: true
          }
        ]
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in mobile', () => {
      const { container } = renderHome(false, {
        requesting: false,
        data: [
          {
            image: 'image',
            title: 'title',
            url: 'url',
            active: true
          }
        ]
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when that active only', () => {
      const { queryByAltText } = renderHome(false, {
        requesting: false,
        data: [
          {
            image: 'image1',
            title: 'title1',
            url: 'url1',
            active: false
          },
          {
            image: 'image2',
            title: 'title2',
            url: 'url2',
            active: true
          }
        ]
      })

      expect(queryByAltText('title1')).not.toBeInTheDocument()
      expect(queryByAltText('title2')).toBeInTheDocument()
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
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(HomeReducers, 'request').mockReturnValue({ type: '' })
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("open url when click the note's images", () => {
      const { getByAltText } = renderHome(true, {
        requesting: false,
        data: [
          {
            image: 'image1',
            title: 'title1',
            url: 'url1',
            active: true
          },
          {
            image: 'image2',
            title: 'title2',
            url: 'url2',
            active: true
          }
        ]
      })

      const Image1 = getByAltText('title1')
      userEvent.click(Image1)
      expect(window.open).toHaveBeenCalledWith('url1')

      const Image2 = getByAltText('title2')
      userEvent.click(Image2)
      expect(window.open).toHaveBeenCalledWith('url2')
    })
  })
})
