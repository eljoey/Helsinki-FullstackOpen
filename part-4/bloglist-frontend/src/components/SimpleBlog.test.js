import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('should render content', () => {
  const blog = {
    title: 'Why I hate testing',
    author: 'Test Tester',
    likes: 9001
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Why I hate testing Test Tester'
  )
})

test('should verify that like button calls event handler function twice', () => {
  const blog = {
    title: 'Why I hate testing',
    author: 'Test Tester',
    likes: 9001
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
