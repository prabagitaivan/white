import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup, Typography, SvgIcon } from '@material-ui/core'
import { Clear, PlayArrow } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { setPage } from '../../reducers/status'
import logger from '../../libraries/logger'

const useStyles = makeStyles(
  {
    editor: {
      marginLeft: 5,
      marginRight: 5,
      border: '1px solid gray'
    },
    buttons: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,

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
      marginRight: 10,
      width: '80vw'
    },
    mainText: {
      fontSize: 14,
      marginLeft: 2,
      marginTop: ({ desktop }) => (desktop ? -1.5 : 0),
      textTransform: 'none'
    }
  },
  { name: 'Playground' }
)

export default memo(() => {
  const { desktop, light } = useSelector(state => state.status)
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
          extensions={[javascript()]}
          onChange={coding}
          theme={light ? 'light' : 'dark'}
          height='45vh'
          className={classes.editor}
        />
        <ButtonGroup fullWidth className={classes.buttons}>
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
          </Button>
        </ButtonGroup>
        <CodeMirror
          editable={false}
          value={results.join('\n')}
          theme={light ? 'light' : 'dark'}
          height='25vh'
          className={classes.editor}
        />
      </Content>
    </div>
  )
})
