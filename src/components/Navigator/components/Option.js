import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  List,
  ListItem,
  Modal,
  Paper,
  Tooltip
} from '@material-ui/core'
import { BubbleChart } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import data from '../../../libraries/menu'

const useStyles = makeStyles(
  {
    button: {
      fontSize: ({ desktop }) => (desktop ? 12 : 10),
      textTransform: 'initial',

      '& .MuiButton-startIcon': {
        marginTop: -3,
        marginRight: 2
      },
      '& .MuiButton-startIcon > svg': {
        fontSize: 24
      }
    },
    menu: {
      position: 'fixed',
      top: ({ desktop }) => (desktop ? 55 : 'initial'),
      left: ({ desktop }) => (desktop ? 17 : 7),
      bottom: ({ desktop }) => (desktop ? 'initial' : 55)
    },
    option: {
      paddingLeft: 8,
      paddingRight: 8,

      '& .MuiButton-root': {
        fontSize: ({ desktop }) => (desktop ? 12 : 10),
        textTransform: 'initial',
        backgroundColor: 'transparent'
      },
      '& .MuiButton-startIcon': {
        marginRight: 2
      },
      '& .MuiButton-startIcon > svg': {
        fontSize: 24
      }
    }
  },
  { name: 'NavigatorOption' }
)

export default memo(() => {
  const [modal, setModal] = useState(false)
  const { desktop, page } = useSelector(state => state.status)
  const { name, options } = data[page]
  const classes = useStyles({ desktop })

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }

  return (
    <>
      <Tooltip title='Menu' placement='bottom-start'>
        <Button
          color='secondary'
          size='small'
          startIcon={<BubbleChart />}
          className={classes.button}
          onClick={openModal}
        >
          {name}
        </Button>
      </Tooltip>
      <Modal
        open={modal}
        onClose={closeModal}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        disableAutoFocus
        disableEnforceFocus
      >
        <Paper elevation={3} className={classes.menu}>
          <List>
            {options.map(({ Icon, text, action }, index) => (
              <ListItem
                key={index}
                className={classes.option}
                button
                onClick={() => {
                  action()
                  closeModal()
                }}
              >
                <Button
                  color='secondary'
                  size='small'
                  startIcon={<Icon />}
                  disableRipple
                >
                  {text}
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Modal>
    </>
  )
})
