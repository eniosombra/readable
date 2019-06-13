const postsOrder = (state = 'SCORE_ORDER', action) => {
  switch (action.type) {
    case 'SORT_POSTS':
      return action.payload
    default:
      return state
  }
}

export default postsOrder
