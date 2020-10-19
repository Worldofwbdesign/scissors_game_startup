import React from 'react'
import { observer, useQuery, emit } from 'startupjs'
import { Div, Button, H2 } from '@startupjs/ui'
import { professorNamePipeline } from '../helpers'
import GameListItem from '../GameListItem'

import './index.styl'

const ProfessorGames = observer(({ userId, user }) => {
  const [games] = useQuery('games', {
    $aggregate: [
      { $match: { professorId: userId } },
      ...professorNamePipeline
    ]
  })

  const handleAdd = () => emit('url', '/createGame')

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
      
      Div.actions
        Button.addBtn(
          color="success"
          onPress=handleAdd
        ) Add Game
  `
})

export default ProfessorGames
