import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { get } from 'lodash'
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
      height: ({ desktop }) => (desktop ? 35 : 30),
      marginLeft: ({ desktop }) => (desktop ? 0 : 2.5),
      cursor: 'default',
      userSelect: 'none'
    },
    emoji: {
      fontSize: ({ desktop }) => (desktop ? 25 : 20)
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
  const options = get(data, `${page}.options`, [])
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
