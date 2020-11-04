import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import {
  AddCircleOutline,
  BlurCircular,
  HighlightOff
} from '@material-ui/icons'
import { Grid, Typography } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import { tree as useStyles } from '../styles'

export default memo(() => {
  const { desktop } = useSelector(state => state.status)
  const { data } = useSelector(state => state.treeBookmarks)
  const classes = useStyles({ desktop })

  const LabelRoot = () => (
    <Typography className={classes.fontRoot}>root</Typography>
  )
  const LabelSubdata = ({ text }) => (
    <Typography className={classes.fontSubdata}>{text}</Typography>
  )
  const LabelBookmark = ({ text, url }) => (
    <Grid className={classes.labelBookmark}>
      <Typography className={classes.fontTitle} noWrap>
        {text}
      </Typography>
      <Typography className={classes.fontUrl} noWrap>
        {url}
      </Typography>
    </Grid>
  )

  const openBookmark = url => window.open(url)

  return (
    <Grid>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<HighlightOff />}
        defaultExpandIcon={<AddCircleOutline />}
        defaultEndIcon={<BlurCircular />}
      >
        <TreeItem nodeId='root' label={<LabelRoot />}>
          {Object.keys(data).map(subdata => (
            <TreeItem
              nodeId={subdata}
              key={subdata}
              label={<LabelSubdata text={subdata} />}
            >
              {data[subdata]
                .filter(bookmark => bookmark.active)
                .map((bookmark, index) => (
                  <TreeItem
                    nodeId={`${subdata}-${index}`}
                    key={index}
                    label={
                      <LabelBookmark text={bookmark.title} url={bookmark.url} />
                    }
                    onClick={() => openBookmark(bookmark.url)}
                  />
                ))}
            </TreeItem>
          ))}
        </TreeItem>
      </TreeView>
    </Grid>
  )
})
