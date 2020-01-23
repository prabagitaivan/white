import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'
import createStyles from './styles'

class Content extends Component {
  render () {
    const { styles, children } = this.props

    return (
      <Container id='content' style={styles.container}>
        {children}
      </Container>
    )
  }
}

const mapStateToProps = ({ status: { desktop } }) => ({
  styles: createStyles(desktop)
})

export default connect(mapStateToProps)(Content)
