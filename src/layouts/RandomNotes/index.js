import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/randomNotes'
import { setPage } from '../../reducers/status'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'

const useStyles = makeStyles(
  {
    imageListItem: {
      '& .MuiImageListItem-item': {
        borderRadius: 5,
        boxShadow: '0px 5px 5px rgb(0 0 0 / 25%)'
      }
    },
    img: {
      cursor: 'pointer'
    },
    imageListItemBar: {
      height: 50,

      '& .MuiImageListItemBar-titleWrap': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiImageListItemBar-rootSubtitle': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiImageListItemBar-title': {
        fontSize: 15,
        lineHeight: 'normal',
        color: 'rgba(255, 255, 255, 0.85)'
      },
      '& .MuiImageListItemBar-subtitle': {
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
    if (data.length === 0) dispatch(request())
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
          <ImageList cols={desktop ? 4 : 1} rowHeight={250} gap={20}>
            {data
              .filter(note => note.active)
              .reverse()
              .map((note, index) => (
                <ImageListItem key={index} className={classes.imageListItem}>
                  <img
                    src={note.image}
                    alt={note.title}
                    className={classes.img}
                    onClick={() => openNote(note.url)}
                    loading='lazy'
                  />
                  <ImageListItemBar
                    title={note.title}
                    subtitle={note.author}
                    className={classes.imageListItemBar}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        )}
      </Content>
    </div>
  )
})
