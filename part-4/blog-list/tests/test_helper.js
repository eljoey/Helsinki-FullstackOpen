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

const notesInDb = async () => {
  const notes = await Blog.find()
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs,
  notesInDb
}
