import React, { memo } from 'react'
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
import useStyles from './styles'

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <AppBar id='navigator' position='fixed' className={classes.appBar}>
      <Fab color='secondary' className={classes.fab}>
        <Avatar>
          <span role='img' aria-label='grin' className={classes.emoji}>
            😁
          </span>
        </Avatar>
      </Fab>
      <Container>
        <Toolbar disableGutters>
          Random Notes
          <div className={classes.grow} />
          <Tooltip title='Random Notes' edge='end'>
            <IconButton size='small'>
              <PlayCircleFilledIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  )
})
