const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'test1',
    author: 'test1 author',
    url: 'test.com',
    likes: 101
  },
  {
    title: 'test1',
    author: 'test1 author',
    url: 'test.com',
    likes: 401
  },
  {
    title: 'test2',
    author: 'test2 author',
    url: 'test.com',
    likes: 302
  },
  {
    title: 'test3',
    author: 'test3 author',
    url: 'test.com',
    likes: 2000
  }
]

test('dummy returns one', () => {
  const blog = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = blogs.slice(0, 1)

    expect(listHelper.totalLikes(oneBlog)).toBe(101)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(2804)
  })
})

describe('favorite blog', () => {
  test("of an empty arry of blogs is 'no blogs given'", () => {
    expect(listHelper.favoriteBlog([])).toEqual('no blogs given')
  })

  test('of an array with one blog returns that blog', () => {
    const oneBlog = blogs.slice(0, 1)

    expect(listHelper.favoriteBlog(oneBlog)).toEqual(oneBlog[0])
  })

  test('of an array of blogs is chosen correctly', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[3])
  })
})

describe('most blogs', () => {
  test("of empty array gives 'no blogs given'", () => {
    expect(listHelper.mostBlogs([])).toEqual('no blogs given')
  })

  test('of an array with one blog returns that author and 1 blog', () => {
    const oneBlog = blogs.slice(0, 1)
    expect(listHelper.mostBlogs(oneBlog)).toEqual({
      author: oneBlog[0].author,
      blogs: 1
    })
  })

  test('of an array of blogs gives correct author and number of blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'test1 author',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  test('of an empty arr to return "no blogs given"', () => {
    expect(listHelper.mostLikes([])).toBe('no blogs given')
  })

  test('of an array of one blog to be correct', () => {
    const oneBlog = blogs.slice(0, 1)

    expect(listHelper.mostLikes(oneBlog)).toEqual({
      author: oneBlog[0].author,
      likes: oneBlog[0].likes
    })
  })

  test('of an array of blogs to be correct', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'test3 author',
      likes: 2000
    })
  })
})
