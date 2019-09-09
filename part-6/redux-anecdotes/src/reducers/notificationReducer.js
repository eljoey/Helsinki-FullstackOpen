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

export const setMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      notification: message
    })
    await setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
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
