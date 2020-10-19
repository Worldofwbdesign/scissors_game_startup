import React from 'react'
import { observer, useSession, useDoc } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, H2 } from '@startupjs/ui'
import ProfessorGames from 'components/ProfessorGames'
import PlayerGames from 'components/PlayerGames'

const PGamesHistory = observer(() => {
  const [userId] = useSession('userId')
  const [user] = useDoc('users', userId)

  if (!user) {
    return pug`
      H2 Login!
    `
  }

  return pug`
    ScrollView.root
      Content
        H2 Past games
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

export default PGamesHistory
