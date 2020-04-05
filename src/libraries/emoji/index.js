import data from './data'

export const getRandomEmoji = () => {
  const limit = data.length - 1
  const index = Math.floor(Math.random() * limit)

  return data[index]
}
