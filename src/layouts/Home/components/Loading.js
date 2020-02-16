import React, { memo } from 'react'
import { LinearProgress } from '@material-ui/core'
import { loading as useStyles } from '../styles'

export default memo(() => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>Loading</div>
      <LinearProgress color='secondary' className={classes.linearProgress} />
    </div>
  )
})
