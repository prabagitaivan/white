import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { request } from '../../../reducers/tapePlayers'
import { setPage } from '../../../reducers/status'
import Loading from '../../../components/Loading'
import Empty from '../../../components/Empty'
import TapePlayers from '../../TapePlayers'

let store

function renderTapePlayers ({ desktop = true, light = true, tapePlayers }) {
  const preloadedState = {
    status: { desktop, light, page: 'TapePlayers' },
    tapePlayers
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <MemoryRouter>
          <TapePlayers />
        </MemoryRouter>
      </Styles>
    </Provider>
  )
}

afterEach(() => {
  store.dispatch.mockRestore()
})

describe('layouts TapePlayers', () => {
  describe('snapshots', () => {
    it('contain navigator', () => {
      const { container } = renderTapePlayers({})
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain loading content when requesting', () => {
      const { container } = renderTapePlayers({})
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
      const { container } = renderTapePlayers({
        tapePlayers: { requesting: false, data: [] }
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
      const { container } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in mobile', () => {
      const { container } = renderTapePlayers({
        desktop: false,
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
    it('contain data content when requesting result is not empty in dark mode', () => {
      const { container } = renderTapePlayers({
        light: false,
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.firstChild).toMatchSnapshot()
    })
  })
  describe('mounting', () => {
    it('set page to tape players after mount', () => {
      renderTapePlayers({})
      expect(store.dispatch).toHaveBeenCalledWith(setPage('TapePlayers'))
    })
    it('request for tape players data after mount', () => {
      renderTapePlayers({})
      expect(store.dispatch).toHaveBeenCalledWith(request())
    })
    it('not request for tape players if data exists', () => {
      renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })
      expect(store.dispatch).not.toHaveBeenCalledWith(request())
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      window.open.mockRestore()
    })

    it("open url when click the tape's url", () => {
      const { getByText } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      const Url = getByText('url1')
      fireEvent.click(Url)
      expect(window.open).toHaveBeenCalledWith('url1')
    })
    it('toggle play pause when click the play controller', () => {
      const { getByTestId } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      const PlayIcon = getByTestId('PlayCircleIcon')

      expect(PlayIcon).toBeInTheDocument()
      fireEvent.click(PlayIcon)
      expect(PlayIcon).not.toBeInTheDocument()

      const PauseIcon = getByTestId('PauseCircleIcon')
      expect(PauseIcon).toBeInTheDocument()
    })
    it('toggle loop when click the loop controller', () => {
      const { getByTestId } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      const RepeatIcon = getByTestId('RepeatIcon')

      expect(RepeatIcon).toBeInTheDocument()
      fireEvent.click(RepeatIcon)
      expect(RepeatIcon).not.toBeInTheDocument()

      const RepeatOnIcon = getByTestId('RepeatOnIcon')
      expect(RepeatOnIcon).toBeInTheDocument()
    })
    it('toggle next  when click the next controller', () => {
      const { getByTestId, getByText } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      expect(getByText('url1')).toBeInTheDocument()

      const SkipNext = getByTestId('SkipNextIcon')

      fireEvent.click(SkipNext)
      expect(getByText('url2')).toBeInTheDocument()

      fireEvent.click(SkipNext)
      expect(getByText('url1')).toBeInTheDocument()
    })
    it('toggle prev  when click the prev controller', () => {
      const { getByTestId, getByText } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      expect(getByText('url1')).toBeInTheDocument()

      const SkipPrevious = getByTestId('SkipPreviousIcon')

      fireEvent.click(SkipPrevious)
      expect(getByText('url2')).toBeInTheDocument()

      fireEvent.click(SkipPrevious)
      expect(getByText('url1')).toBeInTheDocument()
    })
    it('toggle play when click the play player', () => {
      const { getByText } = renderTapePlayers({
        tapePlayers: {
          requesting: false,
          data: [
            { title: 'title1', url: 'url1' },
            { title: 'title2', url: 'url2' }
          ]
        }
      })

      expect(getByText('url1')).toBeInTheDocument()

      const TapeTitle2 = getByText('2. title2')

      fireEvent.click(TapeTitle2)
      expect(getByText('url2')).toBeInTheDocument()
    })
  })
})
