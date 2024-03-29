import reducers, { request, success, failure } from '../treeBookmarks'

function requestAction () {
  const state = reducers(undefined, {})
  return reducers(state, request())
}
function successAction (data) {
  const state = reducers(undefined, {})
  return reducers(state, success(data))
}
function failureAction (error) {
  const state = reducers(undefined, {})
  return reducers(state, failure(error))
}

describe('reducers treeBookmarks', () => {
  it('return default state', () => {
    expect(reducers(undefined, {})).toEqual({
      data: {},
      requesting: true,
      error: null
    })
  })
  it('return correct actions', () => {
    expect(request.toString()).toEqual('treeBookmarks/request')
    expect(success.toString()).toEqual('treeBookmarks/success')
    expect(failure.toString()).toEqual('treeBookmarks/failure')
  })
  it('set for requesting status and clear error when request action called', () => {
    expect(requestAction()).toMatchObject({
      requesting: true,
      error: null
    })
  })
  it('set for data and requesting status and clear error when success action called', () => {
    expect(successAction()).toMatchObject({
      data: {},
      requesting: false,
      error: null
    })
    expect(successAction('data1')).toMatchObject({
      data: 'data1',
      requesting: false,
      error: null
    })
    expect(successAction('data2')).toMatchObject({
      data: 'data2',
      requesting: false,
      error: null
    })
    expect(successAction({ subdata: 'data1' })).toMatchObject({
      data: { subdata: 'data1' },
      requesting: false,
      error: null
    })
  })
  it('set for error and requesting status when failure action called', () => {
    expect(failureAction()).toMatchObject({
      requesting: false,
      error: 'error'
    })
    expect(failureAction('error1')).toMatchObject({
      requesting: false,
      error: 'error1'
    })
    expect(failureAction('error2')).toMatchObject({
      requesting: false,
      error: 'error2'
    })
  })
})
