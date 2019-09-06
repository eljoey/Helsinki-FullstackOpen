import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component

  beforeEach(() => {
    const user = {
      id: 1,
      name: 'Jerry',
      username: 'Terry'
    }
    const blog = {
      title: 'TESSSSSSTTTTTTT test TeSt',
      author: 'Dear Jest',
      likes: 42,
      user: {
        username: 'Terry'
      }
    }

    component = render(<Blog blog={blog} user={user} />)
  })

  test('should only show title and author of blog post by default', () => {
    expect(component.container).toHaveTextContent(
      'TESSSSSSTTTTTTT test TeSt by Dear Jest'
    )
  })

  test('should hide default and show blog content ', () => {
    const clickBlog = component.container.querySelector('.blogContent')
    fireEvent.click(clickBlog)

    const div = component.container.querySelector('.blogDefault')
    expect(div).toHaveStyle('display: none')

    expect(clickBlog).toHaveStyle('display: block')
    expect(clickBlog).toHaveTextContent(
      'TESSSSSSTTTTTTT test TeSt by Dear Jest'
    )
    expect(clickBlog).toHaveTextContent('42 likes')
  })
})
