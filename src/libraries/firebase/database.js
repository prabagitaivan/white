import firebase from './client'
import 'firebase/database'

const database = firebase.database()

export async function getRandomNotes () {
  const snapshots = await database.ref('random_notes/').once('value')
  const data = []

  snapshots.forEach(snapshot => {
    const value = snapshot.val()

    data.push({
      image: value.image,
      title: value.title,
      url: value.url,
      author: value.author,
      active: value.active,
      created_at: new Date(value.created_at),
      updated_at: new Date(value.updated_at)
    })
  })

  return data
}

export async function getTreeBookmarks () {
  const snapshots = await database.ref('tree_bookmarks/').once('value')
  const data = {}

  snapshots.forEach(snapshot => {
    const subkey = snapshot.key
    const subdata = snapshot.val()
    data[subkey] = []

    Object.keys(subdata).forEach(datum => {
      const value = subdata[datum]

      data[subkey].push({
        title: value.title,
        url: value.url,
        active: value.active
      })
    })
  })

  return data
}

export default database
