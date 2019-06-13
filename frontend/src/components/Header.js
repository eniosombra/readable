import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
import iconLogoHome from '../assets/logo-home.png'
import iconNewPost from '../assets/new-post.png'

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={iconLogoHome} title="Readable Home" alt="Readable Home" />
        </Link>
        <Link to="/post/new">
          <img src={iconNewPost} title="Create New Post" alt="Create New Post" />
        </Link>
      </div>
    </header>
  )
}
