import React from 'react'
import { observer } from 'startupjs'
import { Div, Span, H5 } from '@startupjs/ui'

import './index.styl'

const PlayerRoundStats = observer(({ playerName, stats: { action, score, totalScore } = {} }) => {
  return pug`
    Div.root
      H5= playerName

      Span.item 
        Span.label Action: 
        Span.value= action

      Span.item 
        Span.label Points: 
        Span.value= score

      Span.item 
        Span.label Total score: 
        Span.value= totalScore
      Span.
  `
})

export default PlayerRoundStats
