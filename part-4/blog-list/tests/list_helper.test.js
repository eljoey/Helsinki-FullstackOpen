const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogs = [
    {
      title: 'test1',
      author: 'test1 author',
      url: 'test.com',
      likes: 10
    },
    {
      title: 'test2',
      author: 'test2 author',
      url: 'test.com',
      likes: 20
    },
    {
      title: 'test3',
      author: 'test3 author',
      url: 'test.com',
      likes: 30
    },
    {
      title: 'test4',
      author: 'test4 author',
      url: 'test.com',
      likes: 40
    }
  ]

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = blogs.slice(0, 1)

    expect(listHelper.totalLikes(oneBlog)).toBe(10)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(100)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'test1',
      author: 'test1 author',
      url: 'test.com',
      likes: 10
    },
    {
      title: 'test2',
      author: 'test2 author',
      url: 'test.com',
      likes: 40
    },
    {
      title: 'test3',
      author: 'test3 author',
      url: 'test.com',
      likes: 30
    },
    {
      title: 'test4',
      author: 'test4 author',
      url: 'test.com',
      likes: 20
    }
  ]
  test("of an empty arry of blogs is 'no blogs given'", () => {
    expect(listHelper.favoriteBlog([])).toEqual('no blogs given')
  })

  test('of an array with one blog returns that blog', () => {
    const oneBlog = blogs.slice(0, 1)

    expect(listHelper.favoriteBlog(oneBlog)).toEqual(oneBlog[0])
  })

  test('of an array of blogs is chosen correctly', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
  })
})
