import { takeLatest, call, put, race, delay } from 'redux-saga/effects'
import { requestSaga, watchRequest } from '../treeBookmarks'
import { request, success, failure } from '../../reducers/treeBookmarks'
import { getTreeBookmarks } from '../../libraries/firebase/database'

describe('sagas treeBookmarks', () => {
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

      expect(generator.next().value).toEqual(
        race({
          data: call(getTreeBookmarks),
          timeout: delay(5000)
        })
      )
      expect(generator.next({ data }).value).toEqual(put(success(data)))
      expect(generator.next().value).toBeUndefined()
    })
    it('handle when request timeout', () => {
      const generator = requestSaga()
      const timeout = true

      expect(generator.next().value).toEqual(
        race({
          data: call(getTreeBookmarks),
          timeout: delay(5000)
        })
      )
      expect(generator.next({ timeout }).value).toEqual(put(failure('timeout')))
      expect(generator.next().value).toBeUndefined()
    })
    it('handle when request error', () => {
      const generator = requestSaga()
      const error = new Error('error')

      expect(generator.next().value).toEqual(
        race({
          data: call(getTreeBookmarks),
          timeout: delay(5000)
        })
      )
      expect(generator.throw(error).value).toEqual(put(failure(error.message)))
      expect(generator.next().value).toBeUndefined()
    })
  })
})
