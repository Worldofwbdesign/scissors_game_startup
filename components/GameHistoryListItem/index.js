import React, { useMemo } from 'react'
import { observer, useValue } from 'startupjs'
import _ from 'lodash'
import { Div, Span, Card, Button } from '@startupjs/ui'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import GameChronology from '../GameChronology'

import './index.styl'

const GameHistoryListItem = observer(({ user = {}, first, game: { _id, name, professorName, stats, players = [] } }) => {
  const [expand, $expand] = useValue(false)
  const playersHash = useMemo(() => _.keyBy(players, '_id'), [players])

  const getPlayerName = playerId => players.find(player => player._id === playerId).name

  return pug`
    Card.root(
      styleName=[first && 'first']
    )
      Div.content
        Div.stats
          Div.item
            Span.item__key Game: 
            Span.item__label= name

          Div.item
            Span.item__key Pofessor: 
            Span.item__label= professorName

          each playerId in Object.keys(stats)
            Div.item(
              key=playerId
            )
              Span.item__key #{getPlayerName(playerId)}: 
              Span.item__label #{stats[playerId].finalScore} (#{stats[playerId].status})

        Div.actions
          Button(
            onPress=() => $expand.set(!expand)
            color="success"
            icon=expand ? faAngleUp : faAngleDown
          ) Chronology

      if expand
        GameChronology(
          gameId=_id
          playersHash=playersHash
        )
  `
})

export default GameHistoryListItem
