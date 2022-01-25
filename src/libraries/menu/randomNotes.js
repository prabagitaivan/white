import { FlashOn, Loop } from '@material-ui/icons'
import { shuffle, random } from 'lodash'
import store from '../../stores'
import { edit } from '../../reducers/randomNotes'

const options = {
  left: [
    {
      Icon: Loop,
      text: 'shuffle-notes',
      action: () => {
        const { data } = store.getState().randomNotes
        if (data && data.length > 0) {
          store.dispatch(edit(shuffle(data)))
        }
      }
    }
  ],
  right: [
    {
      Icon: FlashOn,
      text: 'open-random',
      action: () => {
        const { data } = store.getState().randomNotes
        if (data && data.length > 0) {
          window.open(data[random(data.length - 1)].url)
        }
      }
    }
  ]
}

export default options
