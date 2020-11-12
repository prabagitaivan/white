import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { request } from '../../../reducers/randomNotes'
import { setPage } from '../../../reducers/status'
import Loading from '../../../components/Loading'
import Empty from '../../../components/Empty'
import RandomNotes from '../../RandomNotes'

let store

function renderRandomNotes ({ desktop = true, randomNotes }) {
  const preloadedState = {
    status: { desktop, page: 'RandomNotes' },
    randomNotes
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <RandomNotes />
      </Styles>
    </Provider>
  )
}

afterEach(() => {
  store.dispatch.mockRestore()
})

describe('layouts RandomNotes', () => {
  describe('snapshots', () => {
    it('contain navigator', () => {
      const { container } = renderRandomNotes({})
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain loading content when requesting', () => {
      const { container } = renderRandomNotes({})
      const LoadingRender = render(
        <Provider store={store}>
          <Styles>
            <Loading />
          </Styles>
        </Provider>
      )
      const Content = container.querySelector('#content')
      const LoadingContent = LoadingRender.container
      expect(Content.firstChild).toEqual(LoadingContent.firstChild)
    })
    it('contain empty content when requesting result is empty', () => {
      const { container } = renderRandomNotes({
        randomNotes: { requesting: false, data: [] }
      })
      const EmptyRender = render(
        <Provider store={store}>
          <Styles>
            <Empty />
          </Styles>
        </Provider>
      )
      const Content = container.querySelector('#content')
      const EmptyContent = EmptyRender.container
      expect(Content.firstChild).toEqual(EmptyContent.firstChild)
    })
    it('contain data content when requesting result is not empty in desktop', () => {
      const { container } = renderRandomNotes({
        randomNotes: {
          requesting: false,
          data: [
            {
              image: 'image',
              title: 'title',
              url: 'url',
              active: true
            }
          ]
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in mobile', () => {
      const { container } = renderRandomNotes({
        desktop: false,
        randomNotes: {
          requesting: false,
          data: [
            {
              image: 'image',
              title: 'title',
              url: 'url',
              active: true
            }
          ]
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('show active only in data content', () => {
      const { queryByAltText } = renderRandomNotes({
        randomNotes: {
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
        }
      })

      expect(queryByAltText('title1')).not.toBeInTheDocument()
      expect(queryByAltText('title2')).toBeInTheDocument()
    })
    it('show subtitle when author provided in data content', () => {
      const { queryByText } = renderRandomNotes({
        randomNotes: {
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
        }
      })

      expect(queryByText('author1')).not.toBeInTheDocument()
      expect(queryByText('author2')).toBeInTheDocument()
    })
  })
  describe('mounting', () => {
    beforeEach(() => {
      renderRandomNotes({})
    })

    it('set page to random notes after mount', () => {
      expect(store.dispatch).toHaveBeenCalledWith(setPage('RandomNotes'))
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
      const { getByAltText } = renderRandomNotes({
        randomNotes: {
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
        }
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
