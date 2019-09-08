import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const displayNotification = () => {
    return props.notification === null ? (
      <div></div>
    ) : (
      <div style={style}>{props.notification}</div>
    )
  }

  return <div>{displayNotification()}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
