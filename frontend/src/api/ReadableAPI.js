const url = `http://localhost:3001`;

const headers = {
  Accept: 'application/json',
  Authorization: 'auth',
  'Content-type': 'application/json',
};

export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${url}/posts`, { headers }).then(res => res.json());

export const getPostsByCategory = category =>
  fetch(`${url}/${category}/posts`, { headers }).then(res => res.json());

export const getPostById = id =>
  fetch(`${url}/posts/${id}`, { headers }).then(res => res.json());

export const addPost = post =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post),
  }).then(res => res.json());

export const updatePost = post =>
  fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(post),
  }).then(res => res.json());

export const deletePost = id =>
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: headers,
  });

export const votePost = (id, option) =>
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option }),
  }).then(res => res.json());

export const getCommentsByPost = id =>
  fetch(`${url}/posts/${id}/comments`, { headers }).then(res => res.json());

export const deleteComment = id =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(res => res.json());

export const voteComment = (id, option) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option }),
  }).then(res => res.json());

export const addComment = comment =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment),
  }).then(res => res.json());

export const updateComment = comment =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(comment),
}).then(res => res.json());