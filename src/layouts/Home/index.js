import React, { PureComponent } from 'react'
import Navigator from '../../components/Navigator'

export default class Home extends PureComponent {
  render () {
    return (
      <div>
        <Navigator />
        <div id='content'>Home</div>
      </div>
    )
  }
}
