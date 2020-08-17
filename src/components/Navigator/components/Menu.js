import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Button, Tooltip } from '@material-ui/core'
import { BubbleChart } from '@material-ui/icons'
import { menu as useStyles } from '../styles'
import data from '../../../libraries/menu'

export default memo(() => {
  const { desktop, page } = useSelector(state => state.status)
  const { name } = data[page]
  const classes = useStyles({ desktop })

  return (
    <>
      <Tooltip title='Menu' placement='bottom-start'>
        <Button
          color='secondary'
          size='small'
          startIcon={<BubbleChart />}
          className={classes.button}
        >
          {name}
        </Button>
      </Tooltip>
    </>
  )
})
