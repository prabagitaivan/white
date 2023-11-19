import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup, Typography, SvgIcon } from '@mui/material'
import { Clear, PlayArrow } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import CodeMirror, { Prec, keymap } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { setPage } from '../../reducers/status'
import logger from '../../libraries/logger'

const useStyles = makeStyles(
  {
    mainEditor: {
      marginTop: 20,
      fontSize: 14,
      border: '1px solid gray'
    },
    resultEditor: {
      fontSize: 14,
      border: '1px solid gray'
    },
    buttons: {
      marginTop: 15,
      marginBottom: 15,

      '& .MuiButton-root': {
        borderRadius: 0
      }
    },
    subButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '10vw'
    },
    subText: {
      fontSize: 14,
      marginTop: ({ desktop }) => (desktop ? -1.5 : 0),
      textTransform: 'none'
    },
    mainButton: {
      width: '80vw'
    },
    mainText: {
      fontSize: 14,
      marginLeft: 2,
      marginTop: ({ desktop }) => (desktop ? -1.5 : 0),
      textTransform: 'none'
    },
    keyText: {
      fontSize: 12,
      fontFamily: 'monospace',
      marginLeft: 10,
      marginTop: ({ desktop }) => (desktop ? -2 : 0),
      textTransform: 'none'
    }
  },
  { name: 'Playground' }
)

export default memo(() => {
  const { desktop, mac, light } = useSelector(state => state.status)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop })
  const [code, setCode] = useState("console.log('hello world')")
  const [results, setResults] = useState([])

  const coding = value => setCode(value)

  const clear = () => {
    setCode('')
    setResults([])
  }

  const copy = () => {
    navigator.clipboard.writeText(code)
  }

  const onResults = sign => output => {
    const date = new Date().toISOString().slice(11)
    const data = `${date} ${sign} ${output}`

    setResults(state => [...state, data])
  }

  const execute = async () => {
    setResults([])

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)()
    } catch (error) {
      onResults('💥')(error.toString())
    }
  }

  useEffect(() => {
    dispatch(setPage('Playground'))

    const originalFn = console.log
    console.log = logger(onResults('✨'), originalFn)

    return () => {
      console.log = originalFn
    }
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        <CodeMirror
          autoFocus
          value={code}
          extensions={[
            javascript(),
            Prec.highest(
              keymap.of([
                { key: 'Mod-Enter', preventDefault: true, run: execute }
              ])
            )
          ]}
          onChange={coding}
          theme={light ? 'light' : 'dark'}
          height='calc(100vh - 25vh - 165px)'
          className={classes.mainEditor}
        />
        <ButtonGroup color='secondary' fullWidth className={classes.buttons}>
          <Button onClick={clear} className={classes.subButton}>
            <Clear />
            {desktop ? (
              <Typography className={classes.subText}>clear</Typography>
            ) : null}
          </Button>
          <Button onClick={copy} className={classes.subButton}>
            <SvgIcon>
              <path d='M 15 3.75 H 6 c -0.825 0 -1.5 0.675 -1.5 1.5 v 10.5 h 1.5 V 5.25 h 9 V 3.75 z m 2.25 3 H 9 c -0.825 0 -1.5 0.675 -1.5 1.5 v 10.5 c 0 0.825 0.675 1.5 1.5 1.5 h 8.25 c 0.825 0 1.5 -0.675 1.5 -1.5 V 8.25 c 0 -0.825 -0.675 -1.5 -1.5 -1.5 z m 0 12 H 9 V 8.25 h 8.25 v 10.5 z' />
            </SvgIcon>
            {desktop ? (
              <Typography className={classes.subText}>copy</Typography>
            ) : null}
          </Button>
          <Button onClick={execute} className={classes.mainButton}>
            <PlayArrow />
            <Typography className={classes.mainText}>execute</Typography>
            {desktop && (
              <Typography className={classes.keyText}>
                [{mac ? 'Cmd' : 'Ctrl'} + Enter]
              </Typography>
            )}
          </Button>
        </ButtonGroup>
        <CodeMirror
          editable={false}
          value={results.join('\n')}
          theme={light ? 'light' : 'dark'}
          height='25vh'
          className={classes.resultEditor}
        />
      </Content>
    </div>
  )
})
