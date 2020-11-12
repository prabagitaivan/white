import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    root: {
      fontSize: 20,
      marginTop: -1.5,
      fontWeight: 'bolder'
    },
    subdata: {
      fontSize: 18,
      marginTop: -2.5
    },
    title: {
      fontSize: 15,
      marginBottom: -5
    },
    url: {
      fontSize: 10,
      fontWeight: 'lighter'
    }
  },
  { name: 'TreeBookmarksLabel' }
)

export default memo(({ type, text, url }) => {
  const classes = useStyles()

  if (type === 'root') {
    return <Typography className={classes.root}>root</Typography>
  } else if (type === 'subdata') {
    return <Typography className={classes.subdata}>{text}</Typography>
  } else {
    return (
      <>
        <Typography className={classes.title} noWrap>
          {text}
        </Typography>
        <Typography className={classes.url} noWrap>
          {url}
        </Typography>
      </>
    )
  }
})
