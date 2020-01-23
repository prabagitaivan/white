import firebase from 'firebase/app'

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID
const senderId = process.env.REACT_APP_FIREBASE_SENDER_ID
const appId = process.env.REACT_APP_FIREBASE_APP_ID
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

const options = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: senderId,
  appId,
  measurementId: `G-${measurementId}`
}

firebase.initializeApp(options)

export default firebase
