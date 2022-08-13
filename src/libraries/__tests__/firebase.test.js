import database, {
  getRandomNotes,
  getTreeBookmarks
} from '../firebase/database'

async function mockGetRandomNotes (data = []) {
  const snapshots = data.map(datum => ({
    val: () => datum
  }))

  database.ref = jest.fn(() => ({
    once: jest.fn().mockReturnValue(snapshots)
  }))

  return getRandomNotes()
}

async function mockGetTreeBookmarks (data = {}) {
  const snapshots = Object.keys(data).map(datum => ({
    key: datum,
    val: () => data[datum]
  }))

  database.ref = jest.fn(() => ({
    once: jest.fn().mockReturnValue(snapshots)
  }))

  return getTreeBookmarks()
}

afterEach(() => {
  database.ref.mockRestore()
})

describe('libraries firebase', () => {
  describe('client', () => {
    it('use env when initialize firebase', () => {
      expect(process.env).toMatchObject({
        REACT_APP_FIREBASE_API_KEY: 'firebase-api-key',
        REACT_APP_FIREBASE_PROJECT_ID: 'firebase-project-id',
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID: 'firebase-messaging-sender-id',
        REACT_APP_FIREBASE_APP_ID: 'firebase-app-id'
      })
    })
  })
  describe('database', () => {
    describe('random notes', () => {
      it('send request data to firebase with correct references', async () => {
        await mockGetRandomNotes()
        expect(database.ref).toHaveBeenCalledTimes(1)
        expect(database.ref).toHaveBeenCalledWith('random_notes/')
      })
      it('return with empty data', async () => {
        const result = await mockGetRandomNotes()
        expect(result).toEqual([])
      })
      it('return with correct data', async () => {
        const data = [
          {
            image: 'image1',
            title: 'title1',
            url: 'url1',
            active: true
          },
          {
            image: 'image2',
            title: 'title2',
            url: 'url2',
            active: false
          },
          {
            image: 'image3',
            title: 'title3',
            url: 'url3',
            author: 'author3',
            active: true
          }
        ]
        const result = await mockGetRandomNotes(data)

        expect(result).toEqual([
          {
            image: 'image1',
            title: 'title1',
            url: 'url1',
            active: true
          },
          {
            image: 'image2',
            title: 'title2',
            url: 'url2',
            active: false
          },
          {
            image: 'image3',
            title: 'title3',
            url: 'url3',
            author: 'author3',
            active: true
          }
        ])
      })
    })
    describe('tree bookmarks', () => {
      it('send request data to firebase with correct references', async () => {
        await mockGetTreeBookmarks()
        expect(database.ref).toHaveBeenCalledTimes(1)
        expect(database.ref).toHaveBeenCalledWith('tree_bookmarks/')
      })
      it('return with empty data', async () => {
        const result = await mockGetTreeBookmarks()
        expect(result).toEqual({})
      })
      it('return with correct data', async () => {
        const data = {
          subdata1: [
            {
              title: 'title1',
              url: 'url1',
              active: true
            },
            {
              title: 'title2',
              url: 'url2',
              active: false
            }
          ],
          subdata2: [
            {
              title: 'title1',
              url: 'url1',
              active: false
            }
          ],
          subdata3: []
        }
        const result = await mockGetTreeBookmarks(data)

        expect(result).toEqual({
          subdata1: [
            {
              title: 'title1',
              url: 'url1',
              active: true
            },
            {
              title: 'title2',
              url: 'url2',
              active: false
            }
          ],
          subdata2: [
            {
              title: 'title1',
              url: 'url1',
              active: false
            }
          ],
          subdata3: []
        })
      })
    })
  })
})
