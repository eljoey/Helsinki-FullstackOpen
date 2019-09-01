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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
