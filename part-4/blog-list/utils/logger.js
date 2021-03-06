const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error
}
