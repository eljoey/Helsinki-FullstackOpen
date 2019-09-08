const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.notification
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const voteMessage = anecdote => {
  return {
    type: 'MESSAGE',
    notification: `You voted for '${anecdote}'`
  }
}

export const newMessage = anecdote => {
  return {
    type: 'MESSAGE',
    notification: `New anecdote added '${anecdote}'`
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer
