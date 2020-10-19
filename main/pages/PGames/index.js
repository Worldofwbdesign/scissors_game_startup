import React from 'react'
import { observer, useSession, useDoc } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content } from '@startupjs/ui'
import ProfessorGames from 'components/ProfessorGames'
import PlayerGames from 'components/PlayerGames'

const PGames = observer(() => {
  const [userId] = useSession('userId')
  const [user] = useDoc('users', userId)

  if (!user) return

  return pug`
    ScrollView.root
      Content
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
