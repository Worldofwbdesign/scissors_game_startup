import React from 'react'
import _ from 'lodash'
import { observer, useDoc, useSession, useQuery } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, Div, H2, H4, Pagination } from '@startupjs/ui'
import PlayerGame from 'components/PlayerGame'
import ProfessorGame from 'components/ProfessorGame'
import GameChronology from 'components/GameChronology'

import './index.styl'

const PGame = observer(props => {
  const { match: { params: { gameId } } } = props
  const [userId] = useSession('userId')
  const [user] = useSession('user', userId)
  const [game, $game] = useDoc('games', gameId)
  const [rounds] = useQuery('rounds', { gameId: game && game.id })
  const [players] = useQuery('users', { _id: { $in: _.get(game, 'players', []) } })
  const playersHash = _.keyBy(players, 'id')

  if (!game) {
    return pug`
      H2.h2 Game not found!
    `
  }

  if (!game.players || game.players.length < 2) {
    return pug`
      H2.h2 Waiting for players!
    `
  }

  return pug`
    ScrollView.root
      Content
        H2.h2= game.name
        if user.isProfessor
          ProfessorGame(
            userId=userId
            game=game
            $game=$game
            rounds=rounds
            playersHash=playersHash
          )
        else 
          PlayerGame(
            userId=userId
            game=game
            $game=$game
            rounds=rounds
          )

        Div.chronologyWrapp
          H4 Game chronology

          GameChronology(
            gameId=game.id
            playersHash=playersHash
          )
  `
})

export default PGame
