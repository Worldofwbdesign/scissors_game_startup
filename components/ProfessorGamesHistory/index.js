import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div } from '@startupjs/ui'
import GameHistoryListItem from '../GameHistoryListItem'
import { professorNamePipeline } from '../helpers'

const ProfessorGamesHistory = observer(({ userId }) => {
  const [games] = useQuery('games', {
    $aggregate: [
      { $match: { professorId: userId, status: 'finished' } },
      ...professorNamePipeline
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

export default ProfessorGamesHistory
