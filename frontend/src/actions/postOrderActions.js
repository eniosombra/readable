export const sortPosts = order => dispatch =>
    dispatch({
        type: 'SORT_POSTS',
        payload: order,
    })


