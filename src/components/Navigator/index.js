import React, { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Fab,
  Avatar,
  Container,
  Toolbar,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  PlayCircleFilled,
  GitHub,
  WbSunny,
  Brightness2
} from '@material-ui/icons'
import useStyles from './styles'
import { setTheme } from '../../reducers/status'
import { getRandomEmoji } from '../../libraries/emoji'

const initialEmoji = getRandomEmoji()

const openRepository = () =>
  window.open('https://github.com/prabagitaivan/white')

export default memo(() => {
  const [emoji, setEmoji] = useState(initialEmoji)
  const { desktop, light } = useSelector(state => state.status)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop })

  const changeTheme = () => {
    dispatch(setTheme(!light))
  }
  const changeEmoji = () => {
    const emoji = getRandomEmoji()
    setEmoji(emoji)
  }

  return (
    <AppBar id='navigator' position='fixed' className={classes.appBar}>
      <Fab color='secondary' className={classes.fab} onClick={changeEmoji}>
        <Avatar>
          <span role='img' aria-label={emoji.text} className={classes.emoji}>
            {emoji.image}
          </span>
        </Avatar>
      </Fab>
      <Container>
        <Toolbar disableGutters>
          Random Notes
          <div className={classes.grow} />
          <Tooltip title='Random Notes'>
            <IconButton size='small'>
              <PlayCircleFilled />
            </IconButton>
          </Tooltip>
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
        </Toolbar>
      </Container>
    </AppBar>
  )
})
