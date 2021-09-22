import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/randomNotes'
import { setPage } from '../../reducers/status'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'

const useStyles = makeStyles(
  {
    gridListTile: {
      '& .MuiGridListTile-tile': {
        borderRadius: 5,
        boxShadow: '0px 5px 5px rgb(0 0 0 / 25%)'
      }
    },
    img: {
      cursor: 'pointer'
    },
    gridListTileBar: {
      height: 50,

      '& .MuiGridListTileBar-titleWrap': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiGridListTileBar-rootSubtitle': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiGridListTileBar-title': {
        fontSize: 15,
        lineHeight: 'normal',
        color: 'rgba(255, 255, 255, 0.85)'
      },
      '& .MuiGridListTileBar-subtitle': {
        fontSize: 12,
        lineHeight: 'normal',
        color: 'rgba(255, 255, 255, 0.75)'
      }
    }
  },
  { name: 'RandomNotes' }
)

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const { data, requesting } = useSelector(state => state.randomNotes)
  const dispatch = useDispatch()
  const classes = useStyles()

  const openNote = url => window.open(url)

  useEffect(() => {
    dispatch(setPage('RandomNotes'))
    dispatch(request())
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? (
          <Loading />
        ) : data.length === 0 ? (
          <Empty />
        ) : (
          <GridList cols={desktop ? 4 : 1} cellHeight={250} spacing={20}>
            {data
              .filter(note => note.active)
              .map((note, index) => (
                <GridListTile key={index} className={classes.gridListTile}>
                  <img
                    src={note.image}
                    alt={note.title}
                    className={classes.img}
                    onClick={() => openNote(note.url)}
                    loading='lazy'
                  />
                  <GridListTileBar
                    title={note.title}
                    subtitle={note.author}
                    className={classes.gridListTileBar}
                  />
                </GridListTile>
              ))}
          </GridList>
        )}
      </Content>
    </div>
  )
})
