import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { shuffle } from 'lodash'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { setPage } from '../../reducers/status'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'
import useData from './hooks/useData'

const useStyles = makeStyles(
  {
    search: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '2px 4px 2px 18px',
      marginTop: 20,
      marginBottom: 25,
      borderRadius: 100,
      backgroundColor: 'transparent',
      border: '1px solid #b1b1b1'
    },
    input: {
      flexGrow: 1,
      fontSize: 12
    },
    icon: {
      padding: ({ desktop }) => (desktop ? 2 : 4)
    },
    link: {
      cursor: 'pointer',
      textDecoration: 'none',
      width: 'fit-content',
      color: ({ light }) => (light ? '#181818' : '#ffffff'),
      '& > div:first-child': {
        fontSize: 10,
        fontWeight: 'lighter'
      },
      '& > div:last-child': {
        fontSize: 18,
        fontWeight: 'bolder'
      },

      '&:hover': {
        '& > div:last-child': {
          textDecoration: 'underline'
        }
      }
    },
    description: {
      fontSize: 12
    }
  },
  { name: 'JustMatch' }
)

export default memo(() => {
  const { desktop, light } = useSelector(state => state.status)
  const { data, requesting } = useData()
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const classes = useStyles({ desktop, light })

  useEffect(() => {
    dispatch(setPage('JustMatch'))
  }, [dispatch])

  const onChange = event => setKeyword(event.target.value)
  const openMatch = url => window.open(url)

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? (
          <Loading />
        ) : data.length === 0 ? (
          <Empty />
        ) : (
          <div>
            <div className={classes.search}>
              <InputBase
                value={keyword}
                onChange={onChange}
                className={classes.input}
                placeholder='match'
                autoFocus
              />
              <IconButton size='small' disabled>
                <Search className={classes.icon} />
              </IconButton>
            </div>
            <Grid container spacing={3}>
              {shuffle(data)
                .filter(
                  item =>
                    keyword === '' ||
                    item.title.toLowerCase().includes(keyword) ||
                    item.description.toLowerCase().includes(keyword)
                )
                .map((item, index) => (
                  <Grid item key={index} xs={12}>
                    <div
                      onClick={() => openMatch(item.url)}
                      className={classes.link}
                    >
                      <div className={classes.url}>{item.url}</div>
                      <div className={classes.title}>{item.title}</div>
                    </div>
                    <div className={classes.description}>
                      {item.description}
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </Content>
    </div>
  )
})
