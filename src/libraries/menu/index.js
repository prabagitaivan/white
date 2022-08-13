import randomNotes from './randomNotes'

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
  }
}

export default menu
