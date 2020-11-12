import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    root: {
      textAlign: 'center',
      marginTop: '40vh'
    }
  },
  { name: 'Empty' }
)

export default memo(() => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>Still Empty</div>
      <span role='img' aria-label='three-wise-monkeys'>
        🙈🙉🙊
      </span>
    </div>
  )
})
