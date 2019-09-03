const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('there is initial blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs returned', async () => {
    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('How to do nothing')
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with 404 status if blog doesnt exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('fails with 400 status if id is invalid', async () => {
      const invalidId = 'a10293asdf90xc'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })

    test("verifies that the unique id prop of posts is 'id'", async () => {
      const blogsInDb = await helper.blogsInDb()
      const noteToView = await blogsInDb[0]
      expect(noteToView.id).toBeDefined()
    })
  })

  describe('adds new blog', () => {
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

      const blogsAtEnd = await helper.blogsInDb()
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

      const blogsAtEnd = await helper.blogsInDb()
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

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    })
  })
})

describe('test login functionality', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'admin',
      name: 'admin',
      password: 'adminPassword'
    })
    await user.save()
  })

  test('create new user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newAdmin1',
      name: 'betterAdmin',
      password: 'betterAdminPassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const username = usersAtEnd.map(user => user.username)
    expect(username).toContain(newUser.username)
  })

  test('duplicate user fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      username: 'admin',
      name: 'admin',
      password: 'adminPassword'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('too short password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      username: 'newAdmin1',
      name: 'admin',
      password: 'ne'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('no password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      username: 'newAdmin1',
      password: 'ne'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('too short username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      username: 'n',
      name: 'admin',
      password: 'newAdminPassword'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
