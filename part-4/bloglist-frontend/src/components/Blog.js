import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, setMessage, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none ' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const updateBlogLikes = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(blog.id, updateBlogLikes)
      .then(returnedNote => {
        setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedNote)))
      })
      .catch(() => {
        setMessage({
          message: 'Failed trying to add like',
          type: 'error'
        })

        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const delBlog = () => {
    const newBlogs = blogs.filter(b => b.id !== blog.id)

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService
        .delObj(blog.id)
        .then(() => setBlogs(newBlogs))
        .catch(`${blog.id} was already deleted from the phonebook`)
    }
  }

  const showDelBtnCheck = {
    display: user.username === blog.user.username ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible} onClick={toggleVisibility}>
        <div>
          {blog.title} by {blog.author}
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={addLike}>Like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <button style={showDelBtnCheck} onClick={delBlog}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog
