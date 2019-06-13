const commentsReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_COMMENTS':
            return [...action.payload]
        case 'UPDATE_COMMENT':
            return state.map(comment =>
                action.payload.id === comment.id ? action.payload : comment
            )
        case 'ADD_COMMENT':
            return [...state, action.payload]
        case 'DELETE_COMMENT': {
            return state.filter(comment => comment.id !== action.payload.id)
        }
        default:
            return state
    }
}

export default commentsReducers
