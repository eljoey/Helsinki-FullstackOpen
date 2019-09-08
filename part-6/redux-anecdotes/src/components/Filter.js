import React from 'react'
import { searchAnecdotes } from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = e => {
    props.store.dispatch(searchAnecdotes(e.target.value))
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

export default Filter
