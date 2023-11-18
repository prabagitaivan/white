import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Slider, IconButton, List, ListItemButton } from '@mui/material'
import {
  Repeat,
  RepeatOn,
  SkipNext,
  SkipPrevious,
  PauseCircle,
  PlayCircle
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player/youtube'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'
import { request } from '../../reducers/tapePlayers'
import { setPage } from '../../reducers/status'

const useStyles = makeStyles(
  {
    root: {
      marginTop: 20,
      maxHeight: ({ desktop }) => (desktop ? '88vh' : '78vh'),
      overflowY: 'scroll',

      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '&-ms-overflow-style:': {
        display: 'none'
      }
    },
    container: {
      position: 'sticky',
      zIndex: 1,
      top: 0,
      marginBottom: 10,
      display: 'flex',
      flexDirection: ({ desktop }) => (desktop ? 'row' : 'column'),
      padding: 10,
      backdropFilter: 'blur(2px)',
      borderRadius: 10,
      boxShadow: '0 5px 30px rgba(0, 0, 0, 0.25)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: ({ light }) =>
        light ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },
    player: {
      borderRadius: 5,
      overflow: 'hidden',
      marginLeft: ({ desktop }) => (desktop ? 0 : 'auto'),
      marginRight: ({ desktop }) => (desktop ? 30 : 'auto')
    },
    info: {
      width: ({ desktop }) =>
        desktop ? 'calc(100% - 250px - 30px - 15px)' : '100%',
      paddingLeft: ({ desktop }) => (desktop ? 0 : 10),
      paddingRight: ({ desktop }) => (desktop ? 0 : 10),
      height: '100%'
    },
    link: {
      cursor: 'pointer',
      textDecoration: 'none',
      color: ({ light }) => (light ? '#181818' : '#ffffff'),
      fontSize: 10,
      fontWeight: 'lighter'
    },
    title: {
      width: '90%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 18,
      fontWeight: 'bolder'
    },
    number: {
      marginBottom: 128,
      fontSize: 28,
      fontWeight: 'lighter',
      textAlign: 'right'
    },
    slider: {
      marginTop: ({ desktop }) => (desktop ? 0 : 15)
    },
    list: {
      marginLeft: ({ desktop }) => (desktop ? 275 : 0),
      marginRight: ({ desktop }) => (desktop ? 15 : 0),

      '& > div:hover': {
        backgroundColor: ({ light }) =>
          light ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)'
      },
      '& > div > div': {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    itemActive: {
      fontSize: 12,
      fontWeight: 'bolder',
      backgroundColor: '#b1b1b1',
      borderRadius: 5
    },
    itemInactive: {
      fontSize: 12,
      borderRadius: 5
    },
    controller: {
      display: 'flex',
      flexDirection: ({ desktop }) => (desktop ? 'column' : 'row'),
      alignItems: 'center',
      position: 'absolute',
      bottom: ({ desktop }) => (desktop ? 0 : 50),
      width: ({ desktop }) => (desktop ? 270 : '90vw'),
      marginBottom: ({ desktop }) => (desktop ? 30 : 0),
      justifyContent: ({ desktop }) => (desktop ? 'start' : 'space-around')
    },
    play: {
      '& > svg': {
        fontSize: ({ desktop }) => (desktop ? 160 : 80)
      }
    },
    loop: {
      '& > svg': {
        fontSize: 15
      }
    },
    prevnext: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& > button > svg': {
        fontSize: 28
      },
      '& > div': {
        height: 1,
        width: 30,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#b1b1b1'
      }
    }
  },
  { name: 'TapePlayers' }
)

export default memo(() => {
  const { desktop, light } = useSelector(state => state.status)
  const { data, requesting } = useSelector(state => state.tapePlayers)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop, light })
  const list = useRef(null)
  const player = useRef(null)
  const [tape, setTape] = useState(0)
  const [play, setPlay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [playing, setPlaying] = useState(0)

  const openUrl = url => window.open(url)

  const togglePlay = () => setPlay(!play)
  const toggleLoop = () => setLoop(!loop)

  const onPlay = () => setPlay(true)
  const onPause = () => setPlay(false)
  const onPlaying = state => setPlaying(state.played)
  const onSeek = (_, value) => {
    player.current.seekTo(value)
    setPlaying(value)
  }

  const playTape = (tape = 0) => setTape(tape)
  const nextTape = () => {
    let value = tape + 1
    if (tape + 1 === data.length) value = 0

    list.current.scrollTo({ top: value * 34 })
    setTape(value)
  }
  const prevTape = () => {
    let value = tape - 1
    if (tape === 0) value = data.length - 1

    list.current.scrollTo({ top: value * 34 })
    setTape(value)
  }

  useEffect(() => {
    dispatch(setPage('TapePlayers'))
    if (data.length === 0) dispatch(request())
  }, [dispatch])

  useEffect(() => {
    if (!requesting && data.length > 0) playTape()
  }, [requesting])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? (
          <Loading />
        ) : data.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.root} ref={list}>
            <div className={classes.container}>
              <ReactPlayer
                ref={player}
                url={data[tape].url}
                height={250}
                width={desktop ? 250 : '100%'}
                playing={play}
                loop={loop}
                onPlay={onPlay}
                onPause={onPause}
                onProgress={onPlaying}
                onEnded={nextTape}
                volume={0.25}
                className={classes.player}
              />
              <div className={classes.info}>
                {desktop && (
                  <>
                    <div className={classes.number}>#{tape + 1}</div>
                    <div
                      onClick={() => openUrl(data[tape].url)}
                      className={classes.link}
                    >
                      {data[tape].url}
                    </div>
                    <div className={classes.title}>{data[tape].title}</div>
                  </>
                )}
                <Slider
                  color='secondary'
                  value={playing}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={onSeek}
                  marks
                  className={classes.slider}
                />
              </div>
            </div>
            <List className={classes.list}>
              {data.map((datum, index) => (
                <ListItemButton
                  key={index}
                  className={
                    index === tape ? classes.itemActive : classes.itemInactive
                  }
                  onClick={() => playTape(index)}
                >
                  <div>
                    {index + 1}. {datum.title}
                  </div>
                </ListItemButton>
              ))}
            </List>
            <div className={classes.controller}>
              <IconButton
                className={classes.loop}
                color='secondary'
                onClick={toggleLoop}
              >
                {loop ? <RepeatOn /> : <Repeat />}
              </IconButton>
              <IconButton
                className={classes.play}
                color='secondary'
                onClick={togglePlay}
              >
                {play ? <PauseCircle /> : <PlayCircle />}
              </IconButton>
              <div className={classes.prevnext}>
                <IconButton color='secondary' onClick={prevTape}>
                  <SkipPrevious />
                </IconButton>
                <div className={classes.line} />
                <IconButton color='secondary' onClick={nextTape}>
                  <SkipNext />
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </Content>
    </div>
  )
})
