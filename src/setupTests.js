import '@testing-library/jest-dom'

process.env = {
  ...process.env,
  REACT_APP_FIREBASE_API_KEY: 'firebase-api-key',
  REACT_APP_FIREBASE_PROJECT_ID: 'firebase-project-id',
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: 'firebase-messaging-sender-id',
  REACT_APP_FIREBASE_APP_ID: 'firebase-app-id'
}

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  database: jest.fn(() => ({
    ref: jest.fn()
  }))
}))

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  shuffle: data => data,
  random: jest.fn()
}))

jest.mock('react-player/youtube', () => props => (
  <div {...props}>ReactPlayer</div>
))

Object.defineProperties(window.navigator, {
  onLine: {
    value: true,
    writable: true
  },
  clipboard: {
    value: {
      writeText: () => {}
    }
  },
  platform: {
    value: 'MacIntel',
    writable: true
  }
})

// fix tooltip issues using jest
// https://github.com/mui-org/material-ui/issues/15726#issuecomment-493124813
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  getClientRects: () => [],
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})
