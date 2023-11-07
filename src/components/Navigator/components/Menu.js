import React, { memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, IconButton, List, ListItem } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { get } from 'lodash'
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
    textActive: {
      cursor: 'pointer',
      fontSize: 12,
      textTransform: 'initial'
    },
    textInactive: {
      cursor: 'pointer',
      fontSize: 12,
      textTransform: 'initial',
      opacity: '0.4'
    },
    line: {
      height: 1,
      width: 15,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: '#b1b1b1'
    },
    itemActive: {
      fontSize: 12,
      backgroundColor: '#b1b1b1'
    },
    itemInactive: {
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
  const name = get(data, `${page}.name`, '')
  const classes = useStyles({ desktop })
  const navigate = useNavigate()

  const openLink = route => navigate(route)
  const toggleDrawer = () => setDrawer(!drawer)

  return desktop ? (
    <div className={classes.root}>
      {links.map((link, index) => (
        <Fragment key={index}>
          <Button
            size='small'
            variant='contained'
            className={
              link.name === name ? classes.textActive : classes.textInactive
            }
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
        color='secondary'
        onClick={toggleDrawer}
      >
        <Menu className={classes.icon} />
      </IconButton>
      <Drawer anchor='bottom' open={drawer} onClose={toggleDrawer}>
        <List>
          {links.map((link, index) => (
            <ListItem
              key={index}
              className={
                link.name === name ? classes.itemActive : classes.itemInactive
              }
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
