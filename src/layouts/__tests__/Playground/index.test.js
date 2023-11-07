import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { setPage } from '../../../reducers/status'
import Playground from '../../Playground'

let store

function renderPlayground ({ desktop = true, mac = true, light = true }) {
  const preloadedState = {
    status: { desktop, mac, light, page: 'Playground' }
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()
  jest
    .spyOn(Date.prototype, 'toISOString')
    .mockImplementation(() => '2001-01-01T01:01:01.001Z')

  return render(
    <Provider store={store}>
      <Styles>
        <MemoryRouter>
          <Playground />
        </MemoryRouter>
      </Styles>
    </Provider>
  )
}

afterEach(() => {
  store.dispatch.mockRestore()
  Date.prototype.toISOString.mockRestore()
})

describe('layouts Playground', () => {
  describe('snapshots', () => {
    it('contain navigator', () => {
      const { container } = renderPlayground({})
      const Navigator = container.querySelector('#navigator')
      expect(Navigator).toBeInTheDocument()
    })
    it('contain initial content in desktop', () => {
      const { container } = renderPlayground({})
      const Editors = container.getElementsByClassName('cm-activeLine cm-line')

      expect(Editors).toMatchSnapshot()
    })
    it('contain initial content in mobile', () => {
      const { container } = renderPlayground({ desktop: false })
      const Editors = container.getElementsByClassName('cm-activeLine cm-line')

      expect(Editors).toMatchSnapshot()
    })
    it('contain initial content in light mode', () => {
      const { container } = renderPlayground({})
      const Editors = container.getElementsByClassName('cm-activeLine cm-line')

      expect(Editors).toMatchSnapshot()
    })
    it('contain initial content in dark mode', () => {
      const { container } = renderPlayground({ light: false })
      const Editors = container.getElementsByClassName('cm-activeLine cm-line')

      expect(Editors).toMatchSnapshot()
    })
    it('contain buttons with text in desktop', () => {
      const { container } = renderPlayground({})
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.childNodes[1]).toMatchSnapshot()
    })
    it('contain buttons without text in mobile', () => {
      const { container } = renderPlayground({ desktop: false })
      const Content = container.querySelector('#content')

      expect(Content).toBeInTheDocument()
      expect(Content.childNodes[1]).toMatchSnapshot()
    })
    it('contain key shortcuts in the desktop buttons in mac platform', () => {
      const { getByText } = renderPlayground({})
      expect(getByText('[Cmd + Enter]')).toBeInTheDocument()
    })
    it('contain key shortcuts in the desktop buttons in common platform', () => {
      const { getByText } = renderPlayground({ mac: false })
      expect(getByText('[Ctrl + Enter]')).toBeInTheDocument()
    })
  })
  describe('mounting', () => {
    beforeEach(() => {
      renderPlayground({})
    })

    it('set page to playground after mount', () => {
      expect(store.dispatch).toHaveBeenCalledWith(setPage('Playground'))
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window.navigator.clipboard, 'writeText').mockReturnValue()
    })
    afterEach(() => {
      window.navigator.clipboard.writeText.mockRestore()
    })

    it('clear content when click clear button', () => {
      const { container, getByText } = renderPlayground({})

      const Clear = getByText('clear')
      fireEvent.click(Clear)

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      expect(Editors).toMatchSnapshot()
    })
    it('copy content when click copy button', () => {
      const { getByText } = renderPlayground({})

      const Copy = getByText('copy')
      fireEvent.click(Copy)

      expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
        "console.log('hello world')"
      )
    })
    it('execute the code content when click execute button', () => {
      const { container, getByText } = renderPlayground({})

      const Execute = getByText('execute')
      fireEvent.click(Execute)

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      expect(Editors).toMatchSnapshot()
    })
    it('execute the code content when key shortcuts pressed', async () => {
      const { container, findAllByRole } = renderPlayground({})

      const EditorTextBoxes = await findAllByRole('textbox')
      fireEvent.keyDown(EditorTextBoxes[0], { metaKey: true, key: 'Enter' })

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      expect(Editors).toMatchSnapshot()
    })
    it('execute the code with error content', async () => {
      const { container, getByText, findAllByRole } = renderPlayground({})

      const EditorTextBoxes = await findAllByRole('textbox')
      fireEvent.change(EditorTextBoxes[0], { target: { textContent: 'asdf' } })

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      await waitFor(() => Editors)

      const Execute = getByText('execute')
      fireEvent.click(Execute)

      expect(Editors).toMatchSnapshot()
    })
  })
})
