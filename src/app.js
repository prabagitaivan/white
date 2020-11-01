import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setConnection, setScreen } from './reducers/status'
import RandomNotes from './layouts/RandomNotes'

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
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={RandomNotes} />
      </Switch>
    </BrowserRouter>
  )
}
