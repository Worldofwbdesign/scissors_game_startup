import moment from 'moment'

export const formatDate = timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a') 

export const professorNamePipeline = [
  { $lookup: {
    from: 'users',
    localField: 'pofessorId',
    foreignField: 'id',
    as: 'professorName'
  } },
  {
    $set: { professorName: { $arrayElemAt: ['$professorName.name', 0] } }
  }
]