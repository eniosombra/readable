import React from 'react'

export default function Post2( { post }) {
    return (
        <div>
            <p>List of posts</p>
            <p>{post.title}</p>
        </div>
    )
}
