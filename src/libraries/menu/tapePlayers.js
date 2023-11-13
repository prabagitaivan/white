import { Loop } from '@mui/icons-material'
import { shuffle } from 'lodash'
import store from '../../stores'
import { edit } from '../../reducers/tapePlayers'

const options = [
  {
    Icon: Loop,
    text: 'shuffle-players',
    action: () => {
      const { data } = store.getState().tapePlayers
      if (data && data.length > 0) {
        store.dispatch(edit(shuffle(data)))
      }
    }
  }
]

export default options
