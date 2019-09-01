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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
