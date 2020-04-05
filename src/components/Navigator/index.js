import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Fab,
  Avatar,
  Container,
  Toolbar,
  Tooltip,
  IconButton
} from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import GitHubIcon from '@material-ui/icons/GitHub'
import useStyles from './styles'
import { getRandomEmoji } from '../../libraries/emoji'

const initialEmoji = getRandomEmoji()

const openRepository = () =>
  window.open('https://github.com/prabagitaivan/white')

export default memo(() => {
  const [emoji, setEmoji] = useState(initialEmoji)
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

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
              <PlayCircleFilledIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Repository' edge='end'>
            <IconButton size='small' onClick={openRepository}>
              <GitHubIcon className={classes.githubIcon} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  )
})
