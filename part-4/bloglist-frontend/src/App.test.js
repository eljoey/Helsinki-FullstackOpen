import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('should not render notes if no user logged in', async () => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    expect(component.container).not.toHaveTextContent('First Blog post')
    expect(component.container).not.toHaveTextContent('Second Blog post')
    expect(component.container).not.toHaveTextContent('Third Blog post')

    expect(component.container).toHaveTextContent('username:')
  })

  test('should display blog posts when user is logged in', async () => {
    const user = {
      username: 'admin',
      token: 123457890,
      name: 'Admin Name'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Admin Name logged in.'))

    expect(component.container).toHaveTextContent('First Blog post')
    expect(component.container).toHaveTextContent('Second Blog post')
    expect(component.container).toHaveTextContent('Third Blog post')
  })
})
