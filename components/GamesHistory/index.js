import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div } from '@startupjs/ui'
import GameHistoryListItem from '../GameHistoryListItem'
import { professorNamePipeline, gamePlayersPipeline } from '../helpers'

const GamesHistory = observer(({ user }) => {
  const [games] = useQuery('games', {
    $aggregate: [
      { $match: { [user.isProfessor ? 'professorId' : 'players']: user.id, status: 'finished' } },
      ...professorNamePipeline,
      ...gamePlayersPipeline
    ]
  })

  return pug`
    Div.root
      for game, index in games
        GameHistoryListItem(
          key=game._id
          first=index === 0
          game=game
          user=user
        )
  `
})

export default GamesHistory
