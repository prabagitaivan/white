import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import useStyles from './styles'

export default ({ children }) => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <Container id='content' className={classes.container}>
      {children}
    </Container>
  )
}
