import React, { memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Drawer, IconButton, List, ListItem } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import data from '../../../libraries/menu'

const links = Object.keys(data).map(page => ({
  name: data[page].name,
  route: data[page].route
}))

const useStyles = makeStyles(
  {
    root: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    active: {
      cursor: 'pointer',
      fontSize: 12,
      textTransform: 'initial'
    },
    inactive: {
      cursor: 'pointer',
      fontSize: 12,
      textTransform: 'initial',

      '& .MuiButton-label': {
        color: '#b1b1b1'
      }
    },
    line: {
      height: 1,
      width: 15,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: '#b1b1b1'
    },
    item: {
      fontSize: 12
    },
    icon: {
      padding: 4
    }
  },
  { name: 'NavigatorMenu' }
)

export default memo(() => {
  const [drawer, setDrawer] = useState(false)
  const { desktop, page } = useSelector(state => state.status)
  const { name } = data[page]
  const classes = useStyles({ desktop })
  const history = useHistory()

  const openLink = route => history.push(route)
  const toggleDrawer = () => setDrawer(!drawer)

  return desktop ? (
    <div className={classes.root}>
      {links.map((link, index) => (
        <Fragment key={index}>
          <Button
            size='small'
            className={link.name === name ? classes.active : classes.inactive}
            onClick={() => openLink(link.route)}
          >
            {link.name}
          </Button>
          {index !== links.length - 1 ? <div className={classes.line} /> : null}
        </Fragment>
      ))}
    </div>
  ) : (
    <div>
      <IconButton
        id='navigator-toolbar-menu'
        size='small'
        onClick={toggleDrawer}
      >
        <Menu className={classes.icon} />
      </IconButton>
      <Drawer anchor='bottom' open={drawer} onClose={toggleDrawer}>
        <List>
          {links.map((link, index) => (
            <ListItem
              key={index}
              button
              selected={link.name === name}
              className={classes.item}
              onClick={() => openLink(link.route)}
            >
              {link.name}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
})
