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
    options: null
  },
  Playground: {
    name: 'playground',
    route: '/playground',
    options: null
  }
}

export default menu
