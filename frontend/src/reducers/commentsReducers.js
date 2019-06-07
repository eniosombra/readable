const commentsReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_COMMENTS':
            return [...action.payload]

        case 'UPDATE_COMMENT':
            console.log('update comment')
            return state.map(comment =>
                action.payload.id === comment.id ? action.payload : comment
            )

        default:
            return state
    }
}

export default commentsReducers
