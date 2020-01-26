import firebase from '../firebase/client'
import database, { getRandomNotes } from '../firebase/database'

async function mockGetRandomNotes (data = []) {
  const snapshots = data.map(datum => ({
    val: () => datum
  }))

  database.ref = jest.fn(() => ({
    once: jest.fn().mockReturnValue(snapshots)
  }))

  return getRandomNotes()
}

describe('libraries firebase', () => {
  describe('client', () => {
    it('use env when initialize firebase', () => {
      expect(process.env).toMatchObject({
        REACT_APP_FIREBASE_API_KEY: 'firebase-api-key',
        REACT_APP_FIREBASE_PROJECT_ID: 'firebase-project-id',
        REACT_APP_FIREBASE_SENDER_ID: 'firebase-sender-id',
        REACT_APP_FIREBASE_APP_ID: 'firebase-app-id',
        REACT_APP_FIREBASE_MEASUREMENT_ID: 'firebase-measurement-id'
      })

      expect(firebase.initializeApp).toHaveBeenCalledWith({
        apiKey: 'firebase-api-key',
        authDomain: 'firebase-project-id.firebaseapp.com',
        databaseURL: 'https://firebase-project-id.firebaseio.com',
        projectId: 'firebase-project-id',
        storageBucket: 'firebase-project-id.appspot.com',
        messagingSenderId: 'firebase-sender-id',
        appId: 'firebase-app-id',
        measurementId: 'G-firebase-measurement-id'
      })
    })
  })
  describe('database', () => {
    afterEach(() => {
      database.ref.mockRestore()
    })

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
          published_at: '2020-01-26'
        },
        {
          image: 'image2',
          title: 'title2',
          url: 'url2',
          published_at: '2020-01-27'
        }
      ]

      const result = await mockGetRandomNotes(data)
      expect(result).toEqual([
        {
          image: 'image1',
          title: 'title1',
          url: 'url1',
          published_at: new Date('2020-01-26')
        },
        {
          image: 'image2',
          title: 'title2',
          url: 'url2',
          published_at: new Date('2020-01-27')
        }
      ])
    })
  })
})
