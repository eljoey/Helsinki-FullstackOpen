let _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => {
        return acc + cur.likes
      }, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return 'no blogs given'

  let likes = 0
  let favorite = blogs.filter(blog => {
    if (blog.likes > likes) {
      likes = blog.likes
      return blog
    }
  })

  return favorite[favorite.length - 1]
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return 'no blogs given'

  let authorArr = _.map(blogs, 'author')
  let mostCommonAuthor = _.chain(authorArr)
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .head()
    .value()
  let numberOfBlogs = blogs.reduce((acc, cur) => {
    if (cur.author === mostCommonAuthor) {
      acc += 1
    }
    return acc
  }, 0)

  return {
    author: mostCommonAuthor,
    blogs: numberOfBlogs
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return 'no blogs given'

  let authorLikes = blogs.reduce((acc, cur) => {
    acc[cur.author] = acc[cur.author] + cur.likes || cur.likes
    return acc
  }, {})

  let mostLikesAuthor = Object.keys(authorLikes).reduce((acc, cur) =>
    authorLikes[acc] > authorLikes[cur] ? acc : cur
  )
  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
