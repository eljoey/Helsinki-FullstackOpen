import React from 'react'
import { searchAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = e => {
    props.searchAnecdotes(e.target.value)
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { searchAnecdotes }
)(Filter)
