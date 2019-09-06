import React from 'react'
import { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import Input from './Input'

const Login = ({ setUser, setMessage, message }) => {
  const name = useField('text')
  const pass = useField('password')

  const handleLogin = async e => {
    e.preventDefault()
    let username = name.value
    let password = pass.value

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      name.empty()
      pass.empty()
    } catch (error) {
      setMessage({
        message: error.message,
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
        <Input {...name} />
        password:
        <Input {...pass} />
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default Login
