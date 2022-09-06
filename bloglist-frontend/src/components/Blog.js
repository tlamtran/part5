import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [likes, setLikes] = useState(blog.likes)
    const [visible, setVisible] = useState(false)

    const showIfTrue = { display: visible ? '' : 'none' }
    const showRemoveButton = { display: user.name === blog.user.name ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = () => {
        setLikes(likes + 1)
        blog.likes = likes
        handleLike(blog)
    }

    const remove = async () => {
        handleRemove(blog)
    }

    return(
        <div style={blogStyle} className='blogContent'>
            <div>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility} id='show-button'>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            <div style={showIfTrue} className='hiddenContent'>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {likes}
                    <button onClick={like} className='likeButton'>
                        like
                    </button>
                </div>
                <div>
                    {blog.user.name}
                </div>
                <button style={showRemoveButton} onClick={remove}>remove</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired
}

export default Blog