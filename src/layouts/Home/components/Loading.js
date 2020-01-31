import React, { PureComponent } from 'react'
import { LinearProgress } from '@material-ui/core'
import { loading as styles } from '../styles'

export default class Loading extends PureComponent {
  render () {
    return (
      <div style={styles.root}>
        <div>Loading</div>
        <LinearProgress color='secondary' style={styles.linearProgress} />
      </div>
    )
  }
}
