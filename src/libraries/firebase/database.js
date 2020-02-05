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
      active: value.active,
      created_at: new Date(value.created_at),
      updated_at: new Date(value.updated_at)
    })
  })

  return data
}

export default database
