import firebase from '../firebase/client'

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
})
