import React from 'react'
import _ from 'lodash'
import { observer, useQuery, useValue } from 'startupjs'
import { Div, Pagination } from '@startupjs/ui'
import RoundItem from './RoundItem'

import './index.styl'

const PAGE_SIZE = 10

const GameChronology = observer(({ gameId, playersHash }) => {
  const [page, $page] = useValue(0)
  const [[{ rounds = [], totalCount } = {}] = []] = useQuery('rounds',
    {
      $aggregate: [
        { $match: { gameId, status: 'finished' } },
        {
          $facet: {
            rounds: [{ $skip: page * PAGE_SIZE }, { $limit: PAGE_SIZE }],
            totalCount: [{ $count: 'count' }]
          }
        }
      ]
    }
  )

  return pug`
    Div.root
      for round in rounds
        RoundItem(
          key=round._id
          round=round
          playersHash=playersHash
        )

      Div.pagination
        Pagination(
          variant="compact"
          page=page
          pages=Math.ceil(_.get(totalCount, '0.count', 0) / PAGE_SIZE)
          onChangePage=newPage => $page.set(newPage)
        )
          
  `
})

export default GameChronology
