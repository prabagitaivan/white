import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(
  {
    root: ({ desktop }) => ({
      paddingTop: desktop ? 50 : 0,
      paddingBottom: desktop ? 15 : 70
    })
  },
  { name: 'Content' }
)

export default memo(({ children }) => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <Container id='content' className={classes.root}>
      {children}
    </Container>
  )
})
