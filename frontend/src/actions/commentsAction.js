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

export const addComment = comment => dispatch =>
   ReadableAPI.addComment(comment).then(data => {
      dispatch({
         type: 'ADD_COMMENT',
         payload: data
      })
   })

export const updateComment = comment => dispatch =>
   ReadableAPI.updateComment(comment).then(data =>
      dispatch({
         type: 'UPDATE_COMMENT',
         payload: data
      })
   )

export const deleteComment = data => dispatch =>
   ReadableAPI.deleteComment(data.id).then(data => {
      dispatch({
         type: 'DELETE_COMMENT',
         payload: data
      })
   })



