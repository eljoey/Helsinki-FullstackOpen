import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import './App.css'

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
        <Login
          setUser={setUser}
          user={user}
          message={message}
          setMessage={setMessage}
        />
      )
    } else {
      return (
        <>
          <div>
            {user.name} logged in.{' '}
            <a href="http://localhost:3000" onClick={handleLogout}>
              Logout
            </a>
          </div>
          <h2>Blogs</h2>
          <Notification message={message} />
          <CreateBlog
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
          />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )
    }
  }

  return <div className="App">{loginDisplay()}</div>
}

export default App
