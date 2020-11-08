import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { link as useStyles } from '../styles'
import data from '../../../libraries/menu'

const links = Object.keys(data).map(page => ({
  name: data[page].name,
  route: data[page].route
}))

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
        <>
          <Typography
            key={`link-${index}`}
            className={link.name === name ? classes.active : classes.inactive}
            onClick={() => openLink(link.route)}
          >
            {link.name}
          </Typography>
          {index !== links.length - 1 ? (
            <div key={`line-${index}`} className={classes.line} />
          ) : null}
        </>
      ))}
    </Grid>
  )
})
