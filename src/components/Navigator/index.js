import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Container, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Menu from './components/Menu'
import Side from './components/Side'
import Fab from './components/Fab'

const useStyles = makeStyles(
  {
    appBar: {
      height: 50,
      justifyContent: 'center',
      top: ({ desktop }) => (desktop ? 0 : 'auto'),
      bottom: ({ desktop }) => (desktop ? 'auto' : 0),
      backgroundColor: ({ light }) => (light ? '#ffffff' : '#424242')
    },
    grow: {
      flexGrow: 1
    }
  },
  { name: 'Navigator' }
)

export default memo(() => {
  const { desktop, light } = useSelector(state => state.status)
  const classes = useStyles({ desktop, light })

  return (
    <AppBar id='navigator' position='fixed' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters>
          <Menu />
          <Fab />
          <div className={classes.grow} />
          <Side />
        </Toolbar>
      </Container>
    </AppBar>
  )
})
