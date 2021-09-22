import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Fab, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import data from '../../../libraries/menu'
import { getRandomEmoji } from '../../../libraries/emoji'

const initialEmoji = getRandomEmoji()

const useStyles = makeStyles(
  {
    root: {
      position: 'fixed',
      bottom: ({ desktop }) => (desktop ? 15 : 60),
      left: '50%',
      transform: 'translateX(-50%)'
    },
    main: {
      width: ({ desktop }) => (desktop ? 56 : 40),
      height: ({ desktop }) => (desktop ? 56 : 40),
      opacity: 0.9,

      '& .MuiAvatar-root': {
        width: ({ desktop }) => (desktop ? 40 : 30),
        height: ({ desktop }) => (desktop ? 40 : 30)
      }
    },
    left: {
      width: ({ desktop }) => (desktop ? 36 : 30),
      height: ({ desktop }) => (desktop ? 36 : 30),
      minHeight: ({ desktop }) => (desktop ? 36 : 30),
      marginRight: 7,
      opacity: 0.9
    },
    right: {
      width: ({ desktop }) => (desktop ? 36 : 30),
      height: ({ desktop }) => (desktop ? 36 : 30),
      minHeight: ({ desktop }) => (desktop ? 36 : 30),
      marginLeft: 7,
      opacity: 0.9
    },
    emoji: {
      width: ({ desktop }) => (desktop ? 25 : 20),
      height: ({ desktop }) => (desktop ? 25 : 20),
      fontSize: ({ desktop }) => (desktop ? 25 : 20),
      position: 'absolute',
      top: ({ desktop }) => (desktop ? 8.5 : 6.5)
    },
    icon: {
      padding: ({ desktop }) => (desktop ? 2 : 4),
      color: '#b1b1b1'
    }
  },
  { name: 'NavigatorFab' }
)

export default memo(() => {
  const [emoji, setEmoji] = useState(initialEmoji)
  const { desktop, page } = useSelector(state => state.status)
  const { options } = data[page]
  const classes = useStyles({ desktop })

  const changeEmoji = () => {
    const emoji = getRandomEmoji()
    setEmoji(emoji)
  }

  return (
    <div className={classes.root}>
      {options && options.left
        ? options.left.map((option, index) => (
            <Fab
              key={index}
              id={`navigator-fab-${option.text}`}
              onClick={() => option.action()}
              className={classes.left}
            >
              <option.Icon className={classes.icon} />
            </Fab>
          ))
        : null}
      <Fab
        id='navigator-fab-emoji'
        onClick={changeEmoji}
        className={classes.main}
      >
        <Avatar>
          <span role='img' aria-label={emoji.text} className={classes.emoji}>
            {emoji.image}
          </span>
        </Avatar>
      </Fab>
      {options && options.right
        ? options.right.map((option, index) => (
            <Fab
              key={index}
              id={`navigator-fab-${option.text}`}
              onClick={() => option.action()}
              className={classes.right}
            >
              <option.Icon className={classes.icon} />
            </Fab>
          ))
        : null}
    </div>
  )
})
