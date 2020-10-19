import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div, Card, Span } from '@startupjs/ui'

import './index.styl'

const TopPlayersList = observer(() => {
  const [players = []] = useQuery('games', {
    $aggregate: [
      { $match: { status: 'finished' } },
      { $set: { statsArray: { $objectToArray: '$stats' } } },
      { $unwind: '$statsArray' },
      { $match: { 'statsArray.v.status': 'win' } },
      {
        $group: {
          _id: '$statsArray.k',
          totalScore: { $sum: '$statsArray.v.finalScore' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'player'
        }
      },
      {
        $set: { name: { $arrayElemAt: ['$player.name', 0] } }
      },
      { $unset: 'player' },
      { $sort: { totalScore: -1 } }
    ]
  })

  console.info('players', players)

  return pug`
    Div.root
      for player, index in players
        Card.player(
          styleName=[index === 0 && 'first']
          key=player._id
        )
          Span.player__index #{index + 1}. 
          Span.player__name= player.name
          Span.player__score #{player.totalScore} points
  `
})

export default TopPlayersList
