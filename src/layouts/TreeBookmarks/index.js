import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AddCircleOutline,
  BlurCircular,
  HighlightOff
} from '@mui/icons-material'
import { Grid } from '@mui/material'
import { TreeView, TreeItem } from '@mui/x-tree-view'
import { makeStyles } from '@mui/styles'
import Navigator from '../../components/Navigator'
import Content from '../../components/Content'
import { request } from '../../reducers/treeBookmarks'
import { setPage } from '../../reducers/status'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'
import Label from './components/Label'

const useStyles = makeStyles(
  {
    root: {
      marginTop: 10,
      marginLeft: -8,
      paddingBottom: 10
    },
    tree: {
      '& .MuiTreeItem-group': {
        marginLeft: 15,
        paddingLeft: 7.5,
        borderLeft: '1px dashed gray'
      },
      '& .MuiTreeItem-label': {
        width: ({ desktop }) => (desktop ? '98%' : '91%')
      }
    }
  },
  { name: 'TreeBookmarks' }
)

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const { data, requesting } = useSelector(state => state.treeBookmarks)
  const dispatch = useDispatch()
  const classes = useStyles({ desktop })

  const openBookmark = url => window.open(url)

  useEffect(() => {
    dispatch(setPage('TreeBookmarks'))
    if (Object.keys(data).length === 0) dispatch(request())
  }, [dispatch])

  return (
    <div>
      <Navigator />
      <Content>
        {requesting ? (
          <Loading />
        ) : Object.keys(data).length === 0 ? (
          <Empty />
        ) : (
          <Grid className={classes.root}>
            <TreeView
              className={classes.tree}
              defaultExpanded={['root']}
              defaultCollapseIcon={<HighlightOff />}
              defaultExpandIcon={<AddCircleOutline />}
              defaultEndIcon={<BlurCircular />}
            >
              <TreeItem nodeId='root' label={<Label type='root' />}>
                {Object.keys(data).map(subdata => (
                  <TreeItem
                    nodeId={subdata}
                    key={subdata}
                    label={<Label type='subdata' text={subdata} />}
                  >
                    {data[subdata]
                      .filter(bookmark => bookmark.active)
                      .map((bookmark, index) => (
                        <TreeItem
                          nodeId={`${subdata}-${index}`}
                          key={index}
                          label={
                            <Label text={bookmark.title} url={bookmark.url} />
                          }
                          onClick={() => openBookmark(bookmark.url)}
                        />
                      ))}
                  </TreeItem>
                ))}
              </TreeItem>
            </TreeView>
          </Grid>
        )}
      </Content>
    </div>
  )
})
