import React, { PureComponent } from 'react'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'

export default class Home extends PureComponent {
  render () {
    return (
      <div>
        <Navigator />
        <Content>Home</Content>
      </div>
    )
  }
}
