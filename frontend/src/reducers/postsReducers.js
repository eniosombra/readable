const postsReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_POSTS':
            return [...action.payload]
        case 'UPDATE_POST':
            return state.map(post => action.payload.id === post.id ? action.payload : post)
        case 'ADD_POST':
            return [...state, action.payload]
        case 'DELETE_POST':
            return state.filter(post => post.id !== action.payload.id)
        default:
            return state
    }
}

export default postsReducers
