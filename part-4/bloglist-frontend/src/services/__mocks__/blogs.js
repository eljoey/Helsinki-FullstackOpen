const blogs = [
  {
    id: 1,
    title: 'First Blog post',
    author: 'Jerry',
    likes: 111,
    user: {
      id: 1234,
      username: 'Admin',
      name: 'Admin Name'
    }
  },
  {
    id: 2,
    title: 'Second Blog post',
    author: 'Jerry',
    likes: 222,
    user: {
      id: 1234,
      username: 'Admin',
      name: 'Admin Name'
    }
  },
  {
    id: 3,
    title: 'Third Blog post',
    author: 'Jerry',
    likes: 333,
    user: {
      id: 1234,
      username: 'Admin',
      name: 'Admin Name'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {}

export default { getAll, setToken }
