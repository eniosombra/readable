export const capitalize = (str = '') => {
  if (str.length >0)
    return (typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1))
  else  
    return str
}

export const formatDateTime = timestamp => new Date(timestamp).toDateString() + ' at ' + new Date(timestamp).toLocaleTimeString('en-US')

const sortByVoteScore = elements =>
  Array.isArray(elements)
    ? elements.sort((a, b) => b.voteScore - a.voteScore)
    : elements

const sortByTimeStamp = elements =>
  Array.isArray(elements)
    ? elements.sort((a, b) => b.timestamp - a.timestamp)
    : elements

export const sortBy = (elements, order = 'DEFAULT_ORDER') => {
  switch (order) {
    case 'SCORE_ORDER':
      return sortByVoteScore(elements)
    case 'TIMESTAMP_ORDER':
      return sortByTimeStamp(elements)
    default:
      return elements
  }
}
