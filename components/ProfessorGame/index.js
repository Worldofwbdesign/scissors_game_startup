import React from 'react'
import _ from 'lodash'
import { model, observer } from 'startupjs'
import { Row, Div, H3, Button } from '@startupjs/ui'
import PlayerCard from './PlayerCard'
import { getPlayerStatus } from '../helpers'

import './index.styl'

const ProfessorGame = observer(({ userId, game, rounds, playersHash }) => {
  const currentRound = rounds[0]
  const stats = currentRound.stats

  const handleNext = async () => {
    await model.add('rounds', { gameId: game.id, round: currentRound.round + 1, stats: {} })
  }

  const handleFinish = async () => {
    const [firstPlayerId, secondPlayerId] = Object.keys(currentRound.stats)
    const [firstPlayerStats, secondPlayerStats] = Object.values(currentRound.stats)

    await model.setEach(`games.${game.id}`, {
      status: 'finished',
      stats: {
        [firstPlayerId]: {
          status: getPlayerStatus(firstPlayerStats.totalScore, secondPlayerStats.totalScore),
          finalScore: firstPlayerStats.totalScore
        },
        [secondPlayerId]: {
          status: getPlayerStatus(secondPlayerStats.totalScore, firstPlayerStats.totalScore),
          finalScore: secondPlayerStats.totalScore
        }
      }
    })
  }

  if (game.status === 'finished') {
    return pug`
      H3.title Game is finished!
    `
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
          disabled=currentRound.status !== 'finished'
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
