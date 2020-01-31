export const loading = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  linearProgress: {
    height: 10,
    width: '60%'
  }
}

export const empty = {
  root: {
    textAlign: 'center'
  }
}

export const notes = desktop => ({
  img: {
    cursor: 'pointer'
  },
  gridListTileBar: {
    height: desktop ? 48 : 40
  },
  title: {
    fontSize: desktop ? 24 : 15,
    lineHeight: 'normal',
    whiteSpace: 'normal',
    color: 'rgba(255, 255, 255, 0.85)'
  }
})
