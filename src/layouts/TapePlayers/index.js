import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player/youtube'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'
import { request } from '../../reducers/tapePlayers'
import { setPage } from '../../reducers/status'

const useStyles = makeStyles({}, { name: 'TapePlayers' })

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const { data, requesting } = useSelector(state => state.tapePlayers)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop })
  const [playing, setPlaying] = useState(false)
  const [loop, setLoop] = useState(false)

  const togglePlaying = () => setPlaying(!playing)
  const toggleLoop = () => setLoop(!loop)

  useEffect(() => {
    dispatch(setPage('TapePlayers'))
    if (data.length === 0) dispatch(request())
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? <Loading /> : data.length === 0 ? <Empty /> : <div />}
      </Content>
    </div>
  )
})
