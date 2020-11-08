import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/treeBookmarks'
import { setPage } from '../../reducers/status'
import Loading from './components/Loading'
import Empty from './components/Empty'
import Tree from './components/Tree'

export default memo(() => {
  const { data, requesting } = useSelector(state => state.treeBookmarks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage('TreeBookmarks'))
    dispatch(request())
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? (
          <Loading />
        ) : Object.keys(data).length === 0 ? (
          <Empty />
        ) : (
          <Tree />
        )}
      </Content>
    </div>
  )
})
