import * as ReadableAPI from '../api/ReadableAPI'

export const searchCommentsByPost = postId => dispatch =>
    ReadableAPI.getCommentsByPost(postId).then(data =>
        dispatch({
            type: 'SEARCH_COMMENTS',
            payload: data
        })
    )

export const voteComment = (id, option) => dispatch =>
    ReadableAPI.voteComment(id, option).then(data =>
        dispatch({
            type: 'UPDATE_COMMENT',
            payload: data
        })
    )

