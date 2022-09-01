import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, user, blogs, setBlogs}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5 
    }

    const [likes, setLikes] = useState(blog.likes)
    const [visible, setVisible] = useState(false)

    const showIfTrue = {display: visible ? '' : 'none'}
    const showRemoveButton = {display: user.name === blog.user.name ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = async () => {
        setLikes(likes + 1)
        blog.likes = likes
        await blogService.incrementLike(blog)
    }

    const remove = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(blog)
            setBlogs(blogs.filter( b => b.id !== blog.id ))
        }
    }

    return(
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} 
                <button onClick={toggleVisibility}>
                    {visible ? "hide" : "view"}
                </button>
            </div>
            <div style={showIfTrue}>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {likes}
                    <button onClick={like}>like</button>
                </div>
                <div>
                    {blog.user.name}
                </div>
                <button style={showRemoveButton} onClick={remove}>remove</button>
            </div>
        </div>
    )
}

export default Blog