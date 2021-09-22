import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Container, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Menu from './components/Menu'
import Side from './components/Side'
import Fab from './components/Fab'

const useStyles = makeStyles(
  {
    appBar: {
      height: 50,
      justifyContent: 'center',
      top: ({ desktop }) => (desktop ? 0 : 'auto'),
      bottom: ({ desktop }) => (desktop ? 'auto' : 0)
    },
    grow: {
      flexGrow: 1
    }
  },
  { name: 'Navigator' }
)

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <AppBar id='navigator' position='fixed' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters>
          <Menu />
          <div className={classes.grow} />
          <Side />
        </Toolbar>
      </Container>
      <Fab />
    </AppBar>
  )
})
