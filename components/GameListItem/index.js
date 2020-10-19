import React from 'react'
import { Row, Col, Div, Span, Card, Button } from '@startupjs/ui'
import { observer, emit, model, useSession } from 'startupjs'
import { formatDate } from '../helpers'

import './index.styl'

const GameListItem = observer(({ user = {}, first, $game, game: { _id, name, professorName, players = [], _m: { ctime } } }) => {
  const [userId] = useSession('userId')

  const handleJoin = async () => {
    if (players.length < 2 && !players.includes(userId) && !user.isProfessor) {
      const $game = model.scope(`games.${_id}`)
      await model.fetch($game)
      await $game.push('players', userId)
      model.unfetch($game)
    }
    emit('url', `/game/${_id}`)
  }

  return pug`
    Card.root(
      styleName=[first && 'first']
    )
      Div.stats
        Div.item
          Span.item__key Game: 
          Span.item__label= name

        Div.item
          Span.item__key Pofessor: 
          Span.item__label= professorName

        Div.item
          Span.item__key Created: 
          Span.item__label= formatDate(ctime)

        Div.item
          Span.item__key Players: 
          Span.item__label= players.length

      Div.actions
        Button(
          onPress=handleJoin
          color="success"
        ) Join

  `
})

export default GameListItem
