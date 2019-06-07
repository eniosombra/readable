import * as ReadableAPI from '../api/ReadableAPI'

export const searchCategories = () => dispatch =>
    ReadableAPI.getCategories().then(data =>
        dispatch({
            type: 'SEARCH_CATEGORIES',
            payload: data
        })
    )

