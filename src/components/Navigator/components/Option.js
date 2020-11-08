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
import { option as useStyles } from '../styles'
import data from '../../../libraries/menu'

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
