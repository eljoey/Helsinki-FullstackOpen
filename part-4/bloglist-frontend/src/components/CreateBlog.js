import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ setBlogs, blogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(blogObj).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({
        message: `${blogObj.title} by ${blogObj.author} has been added`,
        type: 'success'
      })

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateBlog
