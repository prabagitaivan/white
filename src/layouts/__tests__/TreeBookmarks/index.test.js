import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { request } from '../../../reducers/treeBookmarks'
import { setPage } from '../../../reducers/status'
import Loading from '../../../components/Loading'
import Empty from '../../../components/Empty'
import TreeBookmarks from '../../TreeBookmarks'

let store

function renderTreeBookmarks ({ desktop = true, treeBookmarks }) {
  const preloadedState = {
    status: { desktop, page: 'TreeBookmarks' },
    treeBookmarks
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <TreeBookmarks />
      </Styles>
    </Provider>
  )
}

afterEach(() => {
  store.dispatch.mockRestore()
})

describe.only('layouts TreeBookmarks', () => {
  describe('snapshots', () => {
    it('contain navigator', () => {
      const { container } = renderTreeBookmarks({})
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain loading content when requesting', () => {
      const { container } = renderTreeBookmarks({})
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
      const { container } = renderTreeBookmarks({
        treeBookmarks: { requesting: false, data: {} }
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
      const { container, queryByText } = renderTreeBookmarks({
        treeBookmarks: {
          requesting: false,
          data: {
            subdata1: [
              {
                title: 'title1',
                url: 'url1',
                active: true
              }
            ]
          }
        }
      })
      const Content = container.querySelector('#content')

      // root version
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()

      // subdata version
      const Data = queryByText('root')
      userEvent.click(Data)
      expect(Content.firstChild).toMatchSnapshot()

      // bookmark version
      const Subdata1 = queryByText('subdata1')
      userEvent.click(Subdata1)
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in mobile', () => {
      const { container, queryByText } = renderTreeBookmarks({
        desktop: false,
        treeBookmarks: {
          requesting: false,
          data: {
            subdata1: [
              {
                title: 'title1',
                url: 'url1',
                active: true
              }
            ]
          }
        }
      })
      const Content = container.querySelector('#content')

      // root version
      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()

      // subdata version
      const Data = queryByText('root')
      userEvent.click(Data)
      expect(Content.firstChild).toMatchSnapshot()

      // bookmark version
      const Subdata1 = queryByText('subdata1')
      userEvent.click(Subdata1)
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('show active only in data content', () => {
      const { queryByText } = renderTreeBookmarks({
        treeBookmarks: {
          requesting: false,
          data: {
            subdata1: [
              {
                title: 'title1',
                url: 'url1',
                active: false
              },
              {
                title: 'title2',
                url: 'url2',
                active: true
              }
            ]
          }
        }
      })

      const Data = queryByText('root')
      userEvent.click(Data)

      const Subdata1 = queryByText('subdata1')
      userEvent.click(Subdata1)

      expect(queryByText('title1')).not.toBeInTheDocument()
      expect(queryByText('title2')).toBeInTheDocument()
    })
  })
  describe('mounting', () => {
    beforeEach(() => {
      renderTreeBookmarks({})
    })

    it('set page to tree bookmarks after mount', () => {
      expect(store.dispatch).toHaveBeenCalledWith(setPage('TreeBookmarks'))
    })
    it('request for tree bookmarks data after mount', () => {
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

    it('open url when click the bookmark', () => {
      const { queryByText } = renderTreeBookmarks({
        treeBookmarks: {
          requesting: false,
          data: {
            subdata1: [
              {
                title: 'title1',
                url: 'url1',
                active: true
              },
              {
                title: 'title2',
                url: 'url2',
                active: true
              }
            ]
          }
        }
      })

      const Data = queryByText('root')
      userEvent.click(Data)

      const Subdata1 = queryByText('subdata1')
      userEvent.click(Subdata1)

      const Bookmark1 = queryByText('title1')
      userEvent.click(Bookmark1)
      expect(window.open).toHaveBeenCalledWith('url1')

      const Bookmark2 = queryByText('title2')
      userEvent.click(Bookmark2)
      expect(window.open).toHaveBeenCalledWith('url2')
    })
  })
})
