import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../../stores'
import Styles from '../../../styles'
import { request } from '../../../reducers/randomNotes'
import Home from '../../Home'

let store

function renderHome (desktop = true, randomNotes) {
  const preloadedState = { status: { desktop }, randomNotes }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <Home />
      </Styles>
    </Provider>
  )
}

afterEach(() => {
  store.dispatch.mockRestore()
})

describe('layouts Home', () => {
  describe('snapshots', () => {
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
    it('show active only in data content', () => {
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
    it('show subtitle when author provided in data content', () => {
      const { queryByText } = renderHome(false, {
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
            author: 'author2',
            active: true
          }
        ]
      })

      expect(queryByText('author1')).not.toBeInTheDocument()
      expect(queryByText('author2')).toBeInTheDocument()
    })
  })
  describe('mounting', () => {
    beforeEach(() => {
      renderHome()
    })

    it('request for random notes data after mount', () => {
      expect(store.dispatch).toHaveBeenCalledWith(request())
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      window.open.mockRestore()
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
