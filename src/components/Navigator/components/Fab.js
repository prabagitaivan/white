import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import data from '../../../libraries/menu'
import { getRandomEmoji } from '../../../libraries/emoji'

const initialEmoji = getRandomEmoji()

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    main: {
      width: ({ desktop }) => (desktop ? 35 : 20),
      height: ({ desktop }) => (desktop ? 35 : 20),
      marginLeft: ({ desktop }) => (desktop ? 0 : 2.5),
      marginRight: ({ desktop }) => (desktop ? 0 : 5),
      cursor: 'default',
      userSelect: 'none'
    },
    emoji: {
      fontSize: ({ desktop }) => (desktop ? 25 : 15)
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
  const pathname = window.location.pathname

  const changeEmoji = () => {
    const emoji = getRandomEmoji()
    setEmoji(emoji)
  }

  useEffect(() => {
    changeEmoji()
  }, [pathname])

  return (
    <div className={classes.root}>
      <div
        id='navigator-fab-emoji'
        onClick={changeEmoji}
        className={classes.main}
      >
        <span role='img' aria-label={emoji.text} className={classes.emoji}>
          {emoji.image}
        </span>
      </div>
      {options.map((option, index) => (
        <IconButton
          key={index}
          id={`navigator-fab-${option.text}`}
          size='small'
          onClick={() => option.action()}
        >
          <option.Icon className={classes.icon} />
        </IconButton>
      ))}
    </div>
  )
})
