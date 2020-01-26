import { takeLatest, call, put } from 'redux-saga/effects'

import { request, success, failure } from '../reducers/randomNotes'
import { getRandomNotes } from '../libraries/firebase/database'

export function * requestSaga () {
  try {
    const data = yield call(getRandomNotes)
    yield put(success(data))
  } catch (error) {
    yield put(failure(error.message))
  }
}

export function * watchRequest () {
  yield takeLatest(request.toString(), requestSaga)
}

export default [watchRequest]
