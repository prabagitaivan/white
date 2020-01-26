import { takeLatest, call, put } from 'redux-saga/effects'
import { requestSaga, watchRequest } from '../randomNotes'
import { request, success, failure } from '../../reducers/randomNotes'
import { getRandomNotes } from '../../libraries/firebase/database'

describe('sagas randomNotes', () => {
  describe('request', () => {
    it('listen to request saga', () => {
      const generator = watchRequest()

      expect(generator.next().value).toEqual(
        takeLatest(request.toString(), requestSaga)
      )
      expect(generator.next().value).toBeUndefined()
    })
    it('handle when request success', () => {
      const generator = requestSaga()
      const data = {}

      expect(generator.next().value).toEqual(call(getRandomNotes))
      expect(generator.next(data).value).toEqual(put(success(data)))
      expect(generator.next().value).toBeUndefined()
    })
    it('handle when request failure', () => {
      const generator = requestSaga()
      const error = new Error('error')

      expect(generator.next().value).toEqual(call(getRandomNotes))
      expect(generator.throw(error).value).toEqual(put(failure(error.message)))
      expect(generator.next().value).toBeUndefined()
    })
  })
})
