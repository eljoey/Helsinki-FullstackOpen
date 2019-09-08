import React from 'react'

const Notification = ({ store }) => {
  const { notification } = store.getState()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const displayNotification = () => {
    return notification === null ? (
      <div></div>
    ) : (
      <div style={style}>{notification}</div>
    )
  }

  return <div>{displayNotification()}</div>
}

export default Notification
