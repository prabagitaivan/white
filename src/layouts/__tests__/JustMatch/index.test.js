import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { request as requestNotes } from '../../../reducers/randomNotes'
import { request as requestBookmarks } from '../../../reducers/treeBookmarks'
import { setPage } from '../../../reducers/status'
import Loading from '../../../components/Loading'
import Empty from '../../../components/Empty'
import JustMatch from '../../JustMatch'

let store

function renderJustMatch ({
  desktop = true,
  light = true,
  randomNotes,
  treeBookmarks
}) {
  const preloadedState = {
    status: { desktop, light, page: 'JustMatch' },
    randomNotes,
    treeBookmarks
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <JustMatch />
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
      const { container } = renderJustMatch({})
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain loading content when requesting', () => {
      const { container } = renderJustMatch({})
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
      const { container } = renderJustMatch({
        randomNotes: { requesting: false, data: [] },
        treeBookmarks: { requesting: false, data: [] }
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
      const { container } = renderJustMatch({
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata2: [{ title: 'title2', url: 'url2', active: true }] }
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in mobile', () => {
      const { container } = renderJustMatch({
        desktop: false,
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata2: [{ title: 'title2', url: 'url2', active: true }] }
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in dark mode', () => {
      const { container } = renderJustMatch({
        light: false,
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata2: [{ title: 'title2', url: 'url2', active: true }] }
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('show active only in data content', () => {
      const { queryAllByText, queryByText } = renderJustMatch({
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: false },
            { image: 'image2', title: 'title2', url: 'url2', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata3: [{ title: 'title3', url: 'url3', active: false }] }
        }
      })

      const notes = queryAllByText('random notes')
      const bookmarks = queryAllByText('tree bookmarks', { exact: false })
      expect(notes.length).toEqual(2) // navigator and 1 match item
      expect(bookmarks.length).toEqual(1) // navigator only

      expect(queryByText('title1')).not.toBeInTheDocument()
      expect(queryByText('title2')).toBeInTheDocument()
    })
    it('show existed only in data content', () => {
      const { queryAllByText, queryByText } = renderJustMatch({
        randomNotes: {
          requesting: false,
          data: []
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata: [{ title: 'title', url: 'url', active: true }] }
        }
      })

      const notes = queryAllByText('random notes')
      const bookmarks = queryAllByText('tree bookmarks', { exact: false })
      expect(notes.length).toEqual(1) // navigator only
      expect(bookmarks.length).toEqual(2) // navigator and 1 match item

      expect(queryByText('title')).toBeInTheDocument()
    })
  })
  describe('mounting', () => {
    it('set page to random notes after mount', () => {
      renderJustMatch({})
      expect(store.dispatch).toHaveBeenCalledWith(setPage('JustMatch'))
    })
    it('request for random notes and tree bookmarks data after mount', () => {
      renderJustMatch({})
      expect(store.dispatch).toHaveBeenCalledWith(requestNotes())
      expect(store.dispatch).toHaveBeenCalledWith(requestBookmarks())
    })
    it('not request for random notes if data exists', () => {
      renderJustMatch({
        randomNotes: {
          requesting: false,
          data: [{ image: 'image', title: 'title', url: 'url', active: true }]
        }
      })
      expect(store.dispatch).not.toHaveBeenCalledWith(requestNotes())
    })
    it('not request for tree bookmarks if data exists', () => {
      renderJustMatch({
        treeBookmarks: {
          requesting: false,
          data: { subdata: [{ title: 'title', url: 'url', active: true }] }
        }
      })
      expect(store.dispatch).not.toHaveBeenCalledWith(requestBookmarks())
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      window.open.mockRestore()
    })

    it("open url when click the match's item", () => {
      const { getByText } = renderJustMatch({
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata2: [{ title: 'title2', url: 'url2', active: true }] }
        }
      })

      const Item1 = getByText('title1')
      userEvent.click(Item1)
      expect(window.open).toHaveBeenCalledWith('url1')

      const Item2 = getByText('url2')
      userEvent.click(Item2)
      expect(window.open).toHaveBeenCalledWith('url2')
    })

    it('match input with the items', async () => {
      const { container, findAllByRole } = renderJustMatch({
        randomNotes: {
          requesting: false,
          data: [
            { image: 'image1', title: 'title1', url: 'url1', active: true },
            { image: 'image2', title: 'title2', url: 'url2', active: true }
          ]
        },
        treeBookmarks: {
          requesting: false,
          data: { subdata3: [{ title: 'title3', url: 'url3', active: true }] }
        }
      })

      const MatchTextBoxes = await findAllByRole('textbox')

      fireEvent.change(MatchTextBoxes[0], { target: { value: 'notes' } })
      const Items = container.querySelector('#content').firstChild.lastChild
      expect(Items).toMatchSnapshot()

      fireEvent.change(MatchTextBoxes[0], { target: { value: 'title3' } })
      expect(Items).toMatchSnapshot()

      fireEvent.change(MatchTextBoxes[0], { target: { value: 'asdf' } })
      expect(Items).toMatchSnapshot()
    })
  })
})
