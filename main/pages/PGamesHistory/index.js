import React from 'react'
import { observer, useSession, useDoc } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, H2 } from '@startupjs/ui'
import ProfessorGamesHistory from 'components/ProfessorGamesHistory'
import PlayerGames from 'components/PlayerGames'

import './index.styl'

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
      Content.content
        H2.h2 Past games
        if user.isProfessor
          ProfessorGamesHistory(
            user=user
          )
        else
          PlayerGames(
            user=user
          )
  `
})

export default PGamesHistory
