const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.data.content
    default:
      return state
  }
}

export const searchAnecdotes = content => {
  return {
    type: 'SEARCH',
    data: {
      content
    }
  }
}

export default filterReducer
