import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Fab, Avatar, Container, Toolbar } from '@material-ui/core'
import useStyles from './styles'
import Link from './components/Link'
import Option from './components/Option'
import Side from './components/Side'
import { getRandomEmoji } from '../../libraries/emoji'

const initialEmoji = getRandomEmoji()

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
          <Option />
          <div className={classes.grow} />
          <Side />
        </Toolbar>
      </Container>
      <Link />
    </AppBar>
  )
})
