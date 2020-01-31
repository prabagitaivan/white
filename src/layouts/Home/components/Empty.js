import React, { PureComponent } from 'react'
import { empty as styles } from '../styles'

export default class Empty extends PureComponent {
  render () {
    return (
      <div style={styles.root}>
        <div>Still Empty</div>
        <span role='img' aria-label='three-wise-monkeys'>
          🙈🙉🙊
        </span>
      </div>
    )
  }
}
