import React from 'react'
import _ from 'lodash'
import { Div, Span } from '@startupjs/ui'
import PlayerRoundStats from '../PlayerRoundStats'

import './index.styl'

const RoundItem = ({ round: { round, stats }, playersHash }) => {
  console.info('playersHash', playersHash)

  return pug`
    Div.root
      Span.item
        Span.label Round: 
        Span.value= round
      each playerId in Object.keys(stats).sort()
        Div.statsWrapp(
          key=playerId
        )
          PlayerRoundStats(
            playerName=_.get(playersHash, [playerId, 'name'])
            stats=stats[playerId]
          )

  `
}

export default RoundItem
