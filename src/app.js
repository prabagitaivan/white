import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setConnection, setScreen } from './reducers/status'
import RandomNotes from './layouts/RandomNotes'
import TreeBookmarks from './layouts/TreeBookmarks'
import Playground from './layouts/Playground'
import JustMatch from './layouts/JustMatch'
import TapePlayers from './layouts/TapePlayers'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const online = () => dispatch(setConnection(true))
    const offline = () => dispatch(setConnection(false))
    const resize = () => dispatch(setScreen(window.innerWidth))

    window.addEventListener('online', online)
    window.addEventListener('offline', offline)
    window.addEventListener('resize', resize)

    resize()

    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
      window.removeEventListener('resize', resize)
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<RandomNotes />} />
      <Route path='/random-notes' element={<RandomNotes />} />
      <Route path='/tree-bookmarks' element={<TreeBookmarks />} />
      <Route path='/playground' element={<Playground />} />
      <Route path='/just-match' element={<JustMatch />} />
      <Route path='/tape-players' element={<TapePlayers />} />
    </Routes>
  )
}
