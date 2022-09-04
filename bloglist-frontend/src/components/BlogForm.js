import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreate, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
            user: user
        }
        setTitle('')
        setAuthor('')
        setUrl('')
        handleCreate(newBlog)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        id='title-input'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        id='author-input'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        id='url-input'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit' id='create-button'>
                    create
                </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default BlogForm