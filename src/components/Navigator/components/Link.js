import React, { memo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import data from '../../../libraries/menu'

const links = Object.keys(data).map(page => ({
  name: data[page].name,
  route: data[page].route
}))

const useStyles = makeStyles(
  {
    root: {
      position: 'fixed',
      top: ({ desktop }) => (desktop ? 'auto' : 0),
      bottom: ({ desktop }) => (desktop ? 0 : 'auto'),
      marginTop: ({ desktop }) => (desktop ? 'initial' : 2.5),
      marginBottom: ({ desktop }) => (desktop ? 4 : 'initial')
    },
    active: {
      cursor: 'pointer',
      fontSize: ({ desktop }) => (desktop ? 12 : 10)
    },
    inactive: {
      cursor: 'pointer',
      fontSize: ({ desktop }) => (desktop ? 12 : 10),
      color: '#b1b1b1'
    },
    line: {
      height: 1,
      width: ({ desktop }) => (desktop ? 15 : 10),
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: '#b1b1b1'
    }
  },
  { name: 'NavigatorLink' }
)

export default memo(() => {
  const { desktop, page } = useSelector(state => state.status)
  const { name } = data[page]
  const classes = useStyles({ desktop })
  const history = useHistory()

  const openLink = route => history.push(route)

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justify='center'
      className={classes.root}
    >
      {links.map((link, index) => (
        <Fragment key={index}>
          <Typography
            className={link.name === name ? classes.active : classes.inactive}
            onClick={() => openLink(link.route)}
          >
            {link.name}
          </Typography>
          {index !== links.length - 1 ? <div className={classes.line} /> : null}
        </Fragment>
      ))}
    </Grid>
  )
})
