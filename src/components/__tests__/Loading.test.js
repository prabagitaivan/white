import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../stores'
import Styles from '../../styles'
import Loading from '../Loading'

describe('components Loading', () => {
  describe('snapshots', () => {
    it('return correct snapshot', () => {
      const { container } = render(
        <Provider store={createStore()}>
          <Styles>
            <Loading />
          </Styles>
        </Provider>
      )
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
