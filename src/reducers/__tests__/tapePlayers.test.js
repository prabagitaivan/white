import reducers, { request, edit, success, failure } from '../tapePlayers'

function requestAction () {
  const state = reducers(undefined, {})
  return reducers(state, request())
}
function editAction (data) {
  const state = reducers(undefined, {})
  return reducers(state, edit(data))
}
function successAction (data) {
  const state = reducers(undefined, {})
  return reducers(state, success(data))
}
function failureAction (error) {
  const state = reducers(undefined, {})
  return reducers(state, failure(error))
}

describe('reducers tapePlayers', () => {
  it('return default state', () => {
    expect(reducers(undefined, {})).toEqual({
      data: [],
      requesting: true,
      error: null
    })
  })
  it('return correct actions', () => {
    expect(request.toString()).toEqual('tapePlayers/request')
    expect(edit.toString()).toEqual('tapePlayers/edit')
    expect(success.toString()).toEqual('tapePlayers/success')
    expect(failure.toString()).toEqual('tapePlayers/failure')
  })
  it('set for requesting status and clear error when request action called', () => {
    expect(requestAction()).toMatchObject({
      requesting: true,
      error: null
    })
  })
  it('set for data when edit action called', () => {
    expect(editAction()).toMatchObject({
      data: []
    })
    expect(editAction('data1')).toMatchObject({
      data: 'data1'
    })
    expect(editAction(['data1', 'data2'])).toMatchObject({
      data: ['data1', 'data2']
    })
  })
  it('set for data and requesting status and clear error when success action called', () => {
    expect(successAction()).toMatchObject({
      data: [],
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
    expect(successAction(['data1', 'data2'])).toMatchObject({
      data: ['data1', 'data2'],
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
