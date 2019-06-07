import * as ReadableAPI from '../api/ReadableAPI'

export const searchPosts = () => dispatch =>
    ReadableAPI.getPosts().then(data =>
        dispatch({
            type: 'SEARCH_POSTS',
            payload: data
        })
    )

export const searchPostsByCategory = (category) => dispatch =>
    ReadableAPI.getPostsByCategory(category).then(data =>
        dispatch({
            type: 'SEARCH_POSTS',
            payload: data
        })
    )

export const searchPostById = (id) => dispatch =>
    ReadableAPI.getPostById(id).then(data =>
        dispatch({
            type: 'SEARCH_POSTS',
            payload: [data]
        })
    )

export const votePost = (id, option) => dispatch =>
    ReadableAPI.votePost(id, option).then(data =>
        dispatch({
            type: 'UPDATE_POST',
            payload: data
        })
    )

export const addPost = post => dispatch =>
    ReadableAPI.addPost(post).then(data =>
        dispatch({
            type: 'ADD_POST',
            payload: data
        })
    )

export const deletePost = data => dispatch =>
    ReadableAPI.deletePost(data.id).then(res => {
        if (res.status === 200) {
            dispatch({
                type: 'DELETE_POST',
                payload: data
            })
        }
    })



