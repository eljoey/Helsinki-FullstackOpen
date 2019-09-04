import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ user, setUser, setMessage, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = e => {
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        message: 'Wrong Username or Password',
        type: 'error'
      })

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        <Notification message={message} />
        username:
        <input
          type="text"
          name="Username"
          value={username}
          onChange={handleUsername}
        />
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default Login
