import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/randomNotes'
import Loading from './components/Loading'
import Empty from './components/Empty'
import Notes from './components/Notes'

class Home extends PureComponent {
  componentDidMount () {
    this.props.request()
  }

  render () {
    const { requesting, notes } = this.props

    return (
      <div>
        <Navigator />
        <Content>
          {requesting ? (
            <Loading />
          ) : notes.length === 0 ? (
            <Empty />
          ) : (
            <Notes />
          )}
        </Content>
      </div>
    )
  }
}

const mapStateToProps = ({ randomNotes: { data, requesting } }) => ({
  notes: data,
  requesting
})

export const mapDispatchToProps = { request }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
