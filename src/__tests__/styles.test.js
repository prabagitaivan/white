import theme from '../styles/theme'

describe('Styles', () => {
  it('return theme configuration', () => {
    expect(theme).toMatchSnapshot()
  })
})
