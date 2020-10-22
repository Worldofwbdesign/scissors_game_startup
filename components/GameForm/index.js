import React from 'react'
import uuid from 'uuid/v4'
import { model, observer, useValue, useSession, emit } from 'startupjs'
import { Content, Input, Button } from '@startupjs/ui'

import './index.styl'

const GameForm = observer(() => {
  const [userId] = useSession('userId')
  const [name, $name] = useValue()

  const handleSave = async () => {
    const id = uuid()
    await model.add('games', { id, name, professorId: userId, players: [] })
    await model.add('rounds', { gameId: id, round: 1, stats: {} })
    emit('url', '/games')
  }

  return pug`
    Content.root
      Input.input(
        type='text'
        placeholder='Enter game name'
        $value=$name
      )
      Button.saveBtn(
        onPress=handleSave
      ) Save
  `
})

export default GameForm
