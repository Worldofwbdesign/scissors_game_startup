import React from 'react'
import _ from 'lodash'
import { model, observer } from 'startupjs'
import { Row, Div, H3, Button } from '@startupjs/ui'
import PlayerCard from './PlayerCard'

import './index.styl'

const ProfessorGame = observer(({ userId, game, rounds, playersHash }) => {
  const currentRound = rounds[rounds.length - 1]
  const stats = currentRound.stats

  const handleNext = async () => {
    await model.add('rounds', { gameId: game.id, round: currentRound.round + 1, stats: {} })
  }

  const handleFinish = () => {

  }

  return pug`
    Div.root
      H3.title Round #{currentRound.round}
      Row.cards
        for playerId in game.players
          PlayerCard(
            key=playerId
            playerName=_.get(playersHash, [playerId, 'name'])
            playerStats=stats[playerId]
          )

      Div.actions
        Button.btn(
          color="warning"
          onPress=handleFinish
        ) Finish game

        Button.btn(
          disabled=currentRound.status !== 'finished'
          color="success"
          onPress=handleNext
        ) Next Round

  `
})

export default ProfessorGame
