import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
  }

  const loginDisplay = () => {
    if (user === null) {
      return (
        <Login setUser={setUser} message={message} setMessage={setMessage} />
      )
    } else {
      return (
        <>
          <div>
            <h2>Blogs</h2>
            {user.name} logged in.{' '}
            <a href="http://localhost:3000" onClick={handleLogout}>
              Logout
            </a>
          </div>
          <Togglable buttonLabel="Create Blog">
            <Notification message={message} />
            <CreateBlog
              setBlogs={setBlogs}
              blogs={blogs}
              setMessage={setMessage}
            />
          </Togglable>
          {/* Terrible naming need a better way to handle */}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                className="blogPost"
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                setMessage={setMessage}
                user={user}
              />
            ))}
        </>
      )
    }
  }

  return <div>{loginDisplay()}</div>
}

export default App
