import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { GitHub, WbSunny, Brightness2 } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { setTheme } from '../../../reducers/status'

const openRepository = () =>
  window.open('https://github.com/prabagitaivan/white')

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      padding: ({ desktop }) => (desktop ? 2 : 4)
    }
  },
  { name: 'NavigatorSide' }
)

export default memo(() => {
  const { desktop, light } = useSelector(state => state.status)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop })

  const changeTheme = () => {
    dispatch(setTheme(!light))
  }

  return (
    <div className={classes.root}>
      <IconButton
        id='navigator-toolbar-repository'
        size='small'
        onClick={openRepository}
      >
        <GitHub className={classes.icon} />
      </IconButton>
      <IconButton
        id='navigator-toolbar-theme'
        size='small'
        onClick={changeTheme}
      >
        {light ? (
          <WbSunny className={classes.icon} />
        ) : (
          <Brightness2 className={classes.icon} />
        )}
      </IconButton>
    </div>
  )
})
