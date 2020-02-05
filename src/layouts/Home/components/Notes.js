import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { notes as createStyles } from '../styles'

class Notes extends PureComponent {
  openNote = url => {
    window.open(url)
  }

  render () {
    const { styles, desktop, notes } = this.props

    return (
      <GridList cols={desktop ? 4 : 1} cellHeight={250} spacing={20}>
        {notes
          .filter(note => note.active)
          .map((note, index) => (
            <GridListTile key={index}>
              <img
                src={note.image}
                alt={note.title}
                style={styles.img}
                onClick={() => this.openNote(note.url)}
              />
              <GridListTileBar
                title={<div style={styles.title}>{note.title}</div>}
                style={styles.gridListTileBar}
              />
            </GridListTile>
          ))}
      </GridList>
    )
  }
}

const mapStateToProps = ({ status: { desktop }, randomNotes: { data } }) => ({
  styles: createStyles(desktop),
  desktop,
  notes: data
})

export default connect(mapStateToProps)(Notes)
