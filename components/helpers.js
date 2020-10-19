import moment from 'moment'

export const formatDate = timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

export const professorNamePipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'pofessorId',
      foreignField: 'id',
      as: 'professorName'
    }
  },
  {
    $set: { professorName: { $arrayElemAt: ['$professorName.name', 0] } }
  }
]

export const gamePlayersPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'players',
      foreignField: '_id',
      as: 'players'
    }
  }
]

export const getPlayerStatus = (playerScore, competitiorScore) => {
  if (playerScore === competitiorScore) return 'draw'

  if (playerScore > competitiorScore) return 'win'

  return 'lost'
}
