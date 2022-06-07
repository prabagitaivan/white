import { takeLatest, call, put, race, delay } from 'redux-saga/effects'
import { request, success, failure } from '../reducers/randomNotes'
import { getRandomNotes } from '../libraries/firebase/database'

export function * requestSaga () {
  try {
    const { data, timeout } = yield race({
      data: call(getRandomNotes),
      timeout: delay(5000)
    })

    if (timeout) yield put(failure('timeout'))
    else yield put(success(data))
  } catch (error) {
    yield put(failure(error.message))
  }
}

export function * watchRequest () {
  yield takeLatest(request.toString(), requestSaga)
}

export default [watchRequest]
