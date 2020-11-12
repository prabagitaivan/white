import React, { memo } from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40vh'
    },
    linearProgress: {
      height: 10,
      width: '60%',

      '& .MuiLinearProgress-barColorSecondary': {
        backgroundColor: '#b1b1b1'
      }
    }
  },
  { name: 'Loading' }
)

export default memo(() => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>Loading</div>
      <LinearProgress color='secondary' className={classes.linearProgress} />
    </div>
  )
})
