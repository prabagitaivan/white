import '@testing-library/jest-dom'

process.env = {
  ...process.env,
  REACT_APP_FIREBASE_API_KEY: 'firebase-api-key',
  REACT_APP_FIREBASE_PROJECT_ID: 'firebase-project-id',
  REACT_APP_FIREBASE_SENDER_ID: 'firebase-sender-id',
  REACT_APP_FIREBASE_APP_ID: 'firebase-app-id'
}

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  database: jest.fn(() => ({
    ref: jest.fn()
  }))
}))

Object.defineProperty(window.navigator, 'onLine', {
  value: true,
  writable: true
})
