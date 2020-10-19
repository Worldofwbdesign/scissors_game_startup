import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div, H2 } from '@startupjs/ui'
import GameListItem from '../GameListItem'
import { professorNamePipeline } from '../helpers'

import './index.styl'

const PlayerGames = observer(({ userId, user }) => {
  const [games] = useQuery('games', {
    $aggregate: [
      {
        $match: {
          status: { $ne: 'finished' },
          $or: [
            { players: userId },
            { $expr: { $lt: [{ $size: '$players' }, 2] } }
          ]
        }
      },
      ...professorNamePipeline
    ]
  })

  return pug`
    Div.root
      H2.h2 Games
      Div.games
        for game, index in games
          GameListItem(
            key=game._id
            first=index === 0
            game=game
            user=user
          )
  `
})

export default PlayerGames
