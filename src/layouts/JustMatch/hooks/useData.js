import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { request as requestNotes } from '../../../reducers/randomNotes'
import { request as requestBookmarks } from '../../../reducers/treeBookmarks'

export default () => {
  const stateNotes = useSelector(state => state.randomNotes)
  const stateBookmarks = useSelector(state => state.treeBookmarks)
  const [data, setData] = useState([])
  const [notes, setNotes] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const dispatch = useDispatch()

  const requesting = stateNotes.requesting || stateBookmarks.requesting

  useEffect(() => {
    if (stateNotes.data.length === 0) {
      dispatch(requestNotes())
    }
    if (Object.keys(stateBookmarks.data).length === 0) {
      dispatch(requestBookmarks())
    }
  }, [dispatch])

  useEffect(() => {
    if (stateNotes.data.length > 0) {
      const data = []
      stateNotes.data.forEach(note => {
        if (!note.active) return

        data.push({
          description: 'random notes',
          title: note.title,
          url: note.url
        })
      })
      setNotes(data)
    }
  }, [stateNotes.data])

  useEffect(() => {
    if (Object.keys(stateBookmarks.data).length > 0) {
      const data = []
      Object.keys(stateBookmarks.data).forEach(subdata =>
        stateBookmarks.data[subdata].forEach(bookmark => {
          if (!bookmark.active) return

          data.push({
            description: `tree bookmarks - ${subdata}`,
            title: bookmark.title,
            url: bookmark.url
          })
        })
      )
      setBookmarks(data)
    }
  }, [stateBookmarks.data])

  useEffect(() => {
    if (!requesting) setData(notes.concat(bookmarks))
  }, [requesting, notes, bookmarks])

  return { data, requesting }
}
