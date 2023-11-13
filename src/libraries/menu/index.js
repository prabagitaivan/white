import randomNotes from './randomNotes'
import tapePlayers from './tapePlayers'

const menu = {
  RandomNotes: {
    name: 'random notes',
    route: '/random-notes',
    options: randomNotes
  },
  TreeBookmarks: {
    name: 'tree bookmarks',
    route: '/tree-bookmarks',
    options: []
  },
  Playground: {
    name: 'playground',
    route: '/playground',
    options: []
  },
  TapePlayers: {
    name: 'tape players',
    route: '/tape-players',
    options: tapePlayers
  }
}

export default menu
