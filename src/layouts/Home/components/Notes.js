import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { notes as useStyles } from '../styles'

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const { data } = useSelector(state => state.randomNotes)
  const classes = useStyles({ desktop })

  const openNote = url => window.open(url)

  return (
    <GridList cols={desktop ? 4 : 1} cellHeight={250} spacing={20}>
      {data
        .filter(note => note.active)
        .map((note, index) => (
          <GridListTile key={index}>
            <img
              src={note.image}
              alt={note.title}
              className={classes.img}
              onClick={() => openNote(note.url)}
            />
            <GridListTileBar
              title={<div className={classes.title}>{note.title}</div>}
              className={classes.gridListTileBar}
            />
          </GridListTile>
        ))}
    </GridList>
  )
})
