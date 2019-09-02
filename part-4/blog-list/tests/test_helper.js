const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to do things',
    author: 'Larry Garry',
    url: 'http://www.weeee.com',
    likes: '4'
  },
  {
    title: 'How to do nothing',
    author: 'Lazy Larry',
    url: 'http://www.eeeew.com',
    likes: '444'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovesoon',
    author: 'remove me',
    url: 'www.remove.com'
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find()
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId
}
