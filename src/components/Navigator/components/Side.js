import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tooltip, IconButton } from '@material-ui/core'
import { GitHub, WbSunny, Brightness2 } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { setTheme } from '../../../reducers/status'

const openRepository = () =>
  window.open('https://github.com/prabagitaivan/white')

const useStyles = makeStyles(
  {
    compressIcon: {
      padding: 2
    },
    themeContainer: {
      marginLeft: 10
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
    <>
      <Tooltip title='Repository'>
        <IconButton size='small' onClick={openRepository}>
          <GitHub className={classes.compressIcon} />
        </IconButton>
      </Tooltip>
      <Tooltip
        title='Light / Dark Theme'
        edge='end'
        className={classes.themeContainer}
      >
        <IconButton size='small' onClick={changeTheme}>
          {light ? (
            <WbSunny className={classes.compressIcon} />
          ) : (
            <Brightness2 className={classes.compressIcon} />
          )}
        </IconButton>
      </Tooltip>
    </>
  )
})
