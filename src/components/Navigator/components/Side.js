import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { GitHub, WbSunny, Brightness2, FindInPage } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { setTheme } from '../../../reducers/status'

const openRepository = () => {
  window.open('https://github.com/prabagitaivan/white')
}

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
  const navigate = useNavigate()

  const openJustMatch = () => navigate('/just-match')
  const changeTheme = () => dispatch(setTheme(!light))

  return (
    <div className={classes.root}>
      <IconButton
        id='navigator-toolbar-just-match'
        size='small'
        color='secondary'
        onClick={openJustMatch}
      >
        <FindInPage className={classes.icon} />
      </IconButton>
      <IconButton
        id='navigator-toolbar-repository'
        size='small'
        color='secondary'
        onClick={openRepository}
      >
        <GitHub className={classes.icon} />
      </IconButton>
      <IconButton
        id='navigator-toolbar-theme'
        size='small'
        color='secondary'
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
