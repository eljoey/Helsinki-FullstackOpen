import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { clearMessage, voteMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.addVote(anecdote.id)
    props.voteMessage(anecdote.content)
    setTimeout(() => {
      props.clearMessage()
    }, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote(anecdote)
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
}

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

export default connect(
  mapStateToProps,
  { clearMessage, voteMessage, addVote }
)(AnecdoteList)
