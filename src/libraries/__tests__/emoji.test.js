import data from '../emoji/data'
import { getRandomEmoji } from '../emoji'

describe('libraries emoji', () => {
  describe('data', () => {
    it('return all defined emoji', () => {
      expect(data).toMatchSnapshot()
    })
  })
  describe('main', () => {
    it('get random emoji data', async () => {
      const emoji = getRandomEmoji()
      const found = data.find(
        datum => datum.text === emoji.text && datum.image === emoji.image
      )

      expect(found).not.toBeUndefined()
    })
  })
})
