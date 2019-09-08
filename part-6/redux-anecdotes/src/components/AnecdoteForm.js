import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearMessage, newMessage } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const style = {
    marginBottom: 10
  }
  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.store.dispatch(createAnecdote(content))
    newAnecdote(content)
  }

  const newAnecdote = content => {
    props.store.dispatch(newMessage(content))
    setTimeout(() => {
      props.store.dispatch(clearMessage())
    }, 5000)
  }

  return (
    <div style={style}>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
