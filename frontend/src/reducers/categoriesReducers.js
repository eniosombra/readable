const categoriesReducers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_CATEGORIES':
            return action.payload
        default:
            return state
    }
}

export default categoriesReducers
