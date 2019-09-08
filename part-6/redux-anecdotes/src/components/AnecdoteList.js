import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { clearMessage, voteMessage } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const { anecdotes, filter } = props.store.getState()

  const vote = id => {
    props.store.dispatch(addVote(id))
  }
  const message = anecdote => {
    props.store.dispatch(voteMessage(anecdote))
    setTimeout(() => {
      props.store.dispatch(clearMessage())
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  vote(anecdote.id)
                  message(anecdote.content)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
