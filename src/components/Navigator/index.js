import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  AppBar,
  Fab,
  Avatar,
  Toolbar,
  Tooltip,
  IconButton
} from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import createStyles from './styles'

class Navigator extends PureComponent {
  render () {
    const { styles } = this.props

    return (
      <AppBar id='navigator' position='fixed' style={styles.appBar}>
        <Fab color='secondary' style={styles.fab}>
          <Avatar>
            <span role='img' aria-label='grin' style={styles.emoji}>
              😁
            </span>
          </Avatar>
        </Fab>
        <Toolbar>
          Random Notes
          <div style={styles.grow} />
          <Tooltip title='Random Notes' edge='end'>
            <IconButton size='small'>
              <PlayCircleFilledIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = ({ status: { desktop } }) => ({
  styles: createStyles(desktop)
})

export default connect(mapStateToProps)(Navigator)
