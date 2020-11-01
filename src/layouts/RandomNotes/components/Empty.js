import React, { memo } from 'react'
import { empty as useStyles } from '../styles'

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
