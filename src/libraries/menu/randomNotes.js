import { FlashOn, Loop } from '@material-ui/icons'
import { shuffle, random } from 'lodash'
import store from '../../stores'
import { edit } from '../../reducers/randomNotes'

export default [
  {
    Icon: Loop,
    text: 'Shuffle Notes',
    action: () => {
      const { data } = store.getState().randomNotes
      if (data && data.length > 0) {
        store.dispatch(edit(shuffle(data)))
      }
    }
  },
  {
    Icon: FlashOn,
    text: 'Open Random',
    action: () => {
      const { data } = store.getState().randomNotes
      if (data && data.length > 0) {
        window.open(data[random(data.length - 1)].url)
      }
    }
  }
]
