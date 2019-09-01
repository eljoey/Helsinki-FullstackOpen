const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs returned', async () => {
  const blogsInDb = await helper.notesInDb()

  expect(blogsInDb.length).toBe(helper.initialBlogs.length)
})

test("verifies that the unique id prop of posts is 'id'", async () => {
  const blogsInDb = await helper.notesInDb()
  const noteToView = await blogsInDb[0]
  expect(noteToView.id).toBeDefined()
})

test('verify that POST request creates new blog post', async () => {
  const newBlogPost = {
    title: 'How not to do things',
    author: 'Not Larry Garry',
    url: 'http://www.wwwwwe.com',
    likes: '4444'
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
  expect(title).toContain('How not to do things')
})

test('verifies that if likes property is missing from the request, it will default to zero', async () => {
  const noLikesProperty = {
    title: 'How not to do things',
    author: 'Not Larry Garry',
    url: 'http://www.wwwwwe.com'
  }

  await api
    .post('/api/blogs')
    .send(noLikesProperty)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

  expect(lastBlog.likes).toBe(0)
})

test('verifies that posting a blog with no title and url will result in a 400 status code', async () => {
  const badBlog = {
    author: 'this better not work',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})
afterAll(() => {
  mongoose.connection.close()
})
