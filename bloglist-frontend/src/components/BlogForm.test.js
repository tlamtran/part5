import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> ', async () => {
    const mockHandler = jest.fn()
    const testuser = userEvent.setup()

    const user = {
        name: 'name'
    }

    const { container } = render(<BlogForm user={user} handleCreate={mockHandler}/>)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    await testuser.type(titleInput, 'testtitle')
    await testuser.type(authorInput, 'testauthor')
    await testuser.type(urlInput, 'testurl')
    screen.debug()
    const createButton = container.querySelector('#create-button')
    await testuser.click(createButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testtitle')
    expect(mockHandler.mock.calls[0][0].author).toBe('testauthor')
    expect(mockHandler.mock.calls[0][0].url).toBe('testurl')
})
