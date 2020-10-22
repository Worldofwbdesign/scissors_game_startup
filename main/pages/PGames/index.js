import React from 'react'
import { observer, useSession, useDoc, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Div, Content, Button, H2 } from '@startupjs/ui'
import ProfessorGames from 'components/ProfessorGames'
import PlayerGames from 'components/PlayerGames'

import './index.styl'

const PGames = observer(() => {
  const [userId] = useSession('userId')
  const [user] = useDoc('users', userId)

  if (!user) return

  const handleAdd = () => emit('url', '/createGame')

  return pug`
    ScrollView.root
      Content.content
        Div.header
          H2.h2 Games
          
          Div.actions
            if user.isProfessor
              Button.btn(
                color="success"
                onPress=handleAdd
              ) Add Game

            Button.btn(
              onPress=() => emit('url', '/gamesHistory')
            ) Past games

        if user.isProfessor
          ProfessorGames(
            userId=userId
            user=user
          )
        else
          PlayerGames(
            userId=userId
            user=user
          )
  `
})

export default PGames
