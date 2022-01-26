import { render, fireEvent, waitForDomChange } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../../stores'
import Styles from '../../../styles'
import { setPage } from '../../../reducers/status'
import Playground from '../../Playground'

let store

function renderPlayground ({ desktop = true, light = true }) {
  const preloadedState = {
    status: { desktop, light, page: 'Playground' }
  }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()
  jest
    .spyOn(Date.prototype, 'toISOString')
    .mockImplementation(() => '2001-01-01T01:01:01.001Z')

  return render(
    <Provider store={store}>
      <Styles>
        <Playground />
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

    it('clear content when click clear button', async () => {
      const { container, getByText } = renderPlayground({})

      const Clear = getByText('clear')
      userEvent.click(Clear)

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      await waitForDomChange(Editors)
      expect(Editors).toMatchSnapshot()
    })
    it('copy content when click copy button', () => {
      const { getByText } = renderPlayground({})

      const Copy = getByText('copy')
      userEvent.click(Copy)

      expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
        "console.log('hello world')"
      )
    })
    it('execute the code content when click execute button', async () => {
      const { container, getByText } = renderPlayground({})

      const Execute = getByText('execute')
      userEvent.click(Execute)

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      await waitForDomChange(Editors)
      expect(Editors).toMatchSnapshot()
    })
    it('execute the code with error content', async () => {
      const { container, getByText, findAllByRole } = renderPlayground({})

      const EditorTextBoxes = await findAllByRole('textbox')
      fireEvent.change(EditorTextBoxes[0], { target: { textContent: 'asdf' } })

      const Editors = container.getElementsByClassName('cm-activeLine cm-line')
      await waitForDomChange(Editors)

      const Execute = getByText('execute')
      userEvent.click(Execute)

      await waitForDomChange(Editors)
      expect(Editors).toMatchSnapshot()
    })
  })
})
