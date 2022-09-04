import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Toggleable blog post', () => {
    let container
    beforeEach(() => {
        const blog = {
            title: 'testtitle',
            author: 'testauthor',
            url: 'testurl',
            user: {
                name: 'name'
            },
            likes: 9
        }

        const user = {
            name: 'name'
        }

        container = render(<Blog blog={blog} user={user}/>).container
    })

    test('renders only title and author at start', () => {

        const titleAndAuthor = container.querySelector('.blogContent')
        const likesAndUrl = container.querySelector('.hiddenContent')

        expect(titleAndAuthor).toHaveTextContent('testtitle')
        expect(titleAndAuthor).toHaveTextContent('testauthor')
        expect(likesAndUrl).toHaveStyle('display: none')
    })


    test('url and likes visible after click', async () => {
        const testuser = userEvent.setup()
        const button = screen.getByText('view')
        await testuser.click(button)

        const div = container.querySelector('.hiddenContent')
        expect(div).not.toHaveStyle('display: none')
        expect(div).toHaveTextContent('testurl')
        expect(div).toHaveTextContent('likes 9')
    })
})

describe('liking blog post', () => {
    test('likes button clicked twice', async () => {
        const blog = {
            title: 'testtitle',
            author: 'testauthor',
            url: 'testurl',
            user: {
                name: 'name'
            },
            likes: 9
        }

        const user = {
            name: 'name'
        }

        const mockHandler = jest.fn()

        render(<Blog blog={blog} user={user} handleLike={mockHandler}/>)

        const testuser = userEvent.setup()
        const button = screen.getByText('view')
        await testuser.click(button)
        const likeButton = screen.getByText('like')
        await testuser.click(likeButton)
        await testuser.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
