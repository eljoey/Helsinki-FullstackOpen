import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upVote = async data => {
  const upVoted = {
    ...data,
    votes: data.votes + 1
  }

  const request = await axios.put(`${baseUrl}/${upVoted.id}`, upVoted)
  return request.data
}

export default { getAll, createNew, upVote }
