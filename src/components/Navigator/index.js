import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Fab, Avatar, Container, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Link from './components/Link'
import Option from './components/Option'
import Side from './components/Side'
import { getRandomEmoji } from '../../libraries/emoji'

const initialEmoji = getRandomEmoji()

const useStyles = makeStyles(
  {
    appBar: {
      height: 50,
      justifyContent: 'center',
      top: ({ desktop }) => (desktop ? 0 : 'auto'),
      bottom: ({ desktop }) => (desktop ? 'auto' : 0)
    },
    grow: {
      flexGrow: 1
    },
    fab: {
      position: 'absolute',
      zIndex: 1,
      top: ({ desktop }) => (desktop ? 'initial' : -25),
      bottom: ({ desktop }) => (desktop ? -25 : 'initial'),
      left: 0,
      right: 0,
      margin: '0 auto'
    },
    emoji: {
      position: 'absolute',
      top: 6.5,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: 30
    }
  },
  { name: 'Navigator' }
)

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
      <Fab className={classes.fab} onClick={changeEmoji}>
        <Avatar>
          <span role='img' aria-label={emoji.text} className={classes.emoji}>
            {emoji.image}
          </span>
        </Avatar>
      </Fab>
      <Container>
        <Toolbar disableGutters>
          <Option />
          <div className={classes.grow} />
          <Side />
        </Toolbar>
      </Container>
      <Link />
    </AppBar>
  )
})
