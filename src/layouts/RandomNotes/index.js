import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/randomNotes'
import Loading from './components/Loading'
import Empty from './components/Empty'
import Notes from './components/Notes'

export default memo(() => {
  const { data, requesting } = useSelector(state => state.randomNotes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(request())
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? <Loading /> : data.length === 0 ? <Empty /> : <Notes />}
      </Content>
    </div>
  )
})
