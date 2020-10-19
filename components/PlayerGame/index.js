import React from 'react'
import _ from 'lodash'
import { model, observer } from 'startupjs'
import { Div, Row, H3, H4, H5, Button } from '@startupjs/ui'
import { faHandRock, faHandScissors, faHandPaper } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const actions = [{
  action: 'rock',
  icon: faHandRock
}, {
  action: 'scissors',
  icon: faHandScissors
}, {
  action: 'paper',
  icon: faHandPaper
}]

const resultTextMap = {
  draw: 'Draw',
  win: 'You win',
  lost: 'You lost'
}

const getRoundWinner = (userAction, competitorAction) => {
  let draw, userWinner, competitorWinner
  if (userAction === competitorAction) {
    draw = true
  } else if (
    (userAction === 'rock' && competitorAction === 'scissors') ||
    (userAction === 'scissors' && competitorAction === 'paper') ||
    (userAction === 'paper' && competitorAction === 'rock')
  ) {
    userWinner = true
  } else {
    competitorWinner = true
  }

  return [draw, userWinner, competitorWinner]
}

const PlayerGame = observer(({ userId, game, rounds }) => {
  const currentRound = rounds[rounds.length - 1]
  const previousRound = rounds[rounds.length - 2]
  const stats = currentRound.stats
  const competitorId = Object.keys(stats).find(key => key !== userId)
  const actionDone = currentRound && currentRound.stats[userId]
  console.info('previousRound', previousRound)

  const setFirstRoundStats = async (action, competitorAction) => {
    const [draw, userWinner, competitorWinner] = getRoundWinner(action, competitorAction)

    await model.setEach(`rounds.${currentRound.id}`, {
      status: 'finished',
      stats: {
        [userId]: {
          action,
          status: draw ? 'draw' : userWinner ? 'win' : 'lost',
          score: userWinner ? 1 : 0,
          totalScore: userWinner ? 1 : 0,
          combo: userWinner
        },
        [competitorId]: {
          action: competitorAction,
          status: draw ? 'draw' : competitorWinner ? 'win' : 'lost',
          score: competitorWinner ? 1 : 0,
          totalScore: competitorWinner ? 1 : 0,
          combo: competitorWinner
        }
      }
    })
  }

  const setRoundStats = async (action, competitorAction) => {
    const [draw, userWinner, competitorWinner] = getRoundWinner(action, competitorAction)
    const userPreviousRoundStats = _.get(previousRound, ['stats', userId])
    const competitorPreviousRoundStats = _.get(previousRound, ['stats', competitorId])

    const getUserScore = () => {
      if (userWinner) {
        if (userPreviousRoundStats.combo) {
          return userPreviousRoundStats.totalScore
        } else {
          return 1
        }
      }

      return 0
    }

    const getCompetitorScore = () => {
      if (competitorWinner) {
        if (competitorPreviousRoundStats.combo) {
          return competitorPreviousRoundStats.totalScore
        } else {
          return 1
        }
      }

      return 0
    }

    const userScore = getUserScore()
    const competitorScore = getCompetitorScore()

    const updateObj = {
      status: 'finished',
      stats: {
        [userId]: {
          action,
          status: draw ? 'draw' : userWinner ? 'win' : 'lost',
          score: userScore,
          totalScore: userPreviousRoundStats.totalScore + userScore,
          combo: userWinner || (draw && userPreviousRoundStats.combo)
        },
        [competitorId]: {
          action: competitorAction,
          status: draw ? 'draw' : competitorWinner ? 'win' : 'lost',
          score: competitorScore,
          totalScore: competitorPreviousRoundStats.totalScore + competitorScore,
          combo: competitorWinner || (draw && competitorPreviousRoundStats.combo)
        }
      }
    }

    console.info('updateObj', updateObj)

    await model.setEach(`rounds.${currentRound.id}`, updateObj)
  }

  const handleAction = async action => {
    if (_.isEmpty(stats)) {
      await model.set(`rounds.${currentRound.id}.stats.${userId}.action`, action)
    } else {
      const competitorAction = stats[competitorId].action

      if (!previousRound) {
        await setFirstRoundStats(action, competitorAction)
      } else {
        await setRoundStats(action, competitorAction)
      }
    }
  }

  if (!currentRound) {
    return pug`
      H3.title Game is not started!
    `
  }

  if (game.status === 'finished') {
    return pug`
      H3.title Game is finished!
    `
  }

  return pug`
    Div.root
      H3.title Round #{currentRound.round}
      if currentRound.status === 'finished'
        H4.title Round finished! #{resultTextMap[stats[userId].status]}!
      else if actionDone
        H4.title Waiting for another player!
      else
        H5.title Your turn!
        Row.actions
          for action, index in actions
            Button.action(
              key=action.action
              shape="circle"
              icon=action.icon
              size="xxl"
              color="success"
              onPress=() => handleAction(action.action)
            )
  `
})

export default PlayerGame
