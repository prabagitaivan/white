import firebase from 'firebase/compat/app'

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.REACT_APP_FIREBASE_APP_ID

const options = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId,
  appId
}

firebase.initializeApp(options)

export default firebase
