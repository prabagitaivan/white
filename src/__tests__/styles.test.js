import theme from '../styles/theme'
import fs from 'fs'
import path from 'path'

describe('main Styles', () => {
  it('return global css', () => {
    const file = path.join(__dirname, '/../styles/global.css')
    const globalCss = fs.readFileSync(file).toString()
    expect(globalCss).toMatchSnapshot()
  })
  it('return theme configuration', () => {
    expect(theme).toMatchSnapshot()
  })
})
