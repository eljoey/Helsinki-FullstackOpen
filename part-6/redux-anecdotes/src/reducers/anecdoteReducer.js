const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      console.log(action.data)

      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTE',
    data: anecdotes
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const addVote = id => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export default reducer
