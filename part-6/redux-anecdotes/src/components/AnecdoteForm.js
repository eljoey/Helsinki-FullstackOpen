import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const style = {
    marginBottom: 5
  }
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    setMessage(`New anecdote added ${content}`, 5)
  }

  return (
    <div style={style}>
      <h3>Create new anecdote</h3>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { setMessage, createAnecdote }
)(AnecdoteForm)
