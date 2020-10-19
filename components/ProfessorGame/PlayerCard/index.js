import React from 'react'
import { H4, H5, Card, Icon } from '@startupjs/ui'
import { faHandRock, faHandScissors, faHandPaper } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const iconsMap = {
  rock: faHandRock,
  scissors: faHandScissors,
  paper: faHandPaper
}

const PlayerCard = ({ playerName, playerStats = {} }) => {
  const { action, status } = playerStats

  return pug`
    Card.root
      H4= playerName
      if action
        Icon.icon(
          icon=iconsMap[action]
          size=60
          color="success"
        )
        if status
          H5.status= status
  `
}

export default PlayerCard
