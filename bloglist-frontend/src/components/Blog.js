import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
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

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = async () => {
        setLikes(likes + 1)
        blog.likes = likes
        await blogService.incrementLike(blog)
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
                    <button onClick={like}>
                        like
                    </button>
                </div>
                <div>
                    {blog.user.name}
                </div>
            </div>
        </div>
    )
}

export default Blog