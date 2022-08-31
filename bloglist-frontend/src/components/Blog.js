import { useState } from "react"

const Blog = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5 
    }

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = () => {

    }

    const showIfTrue = {display: visible ? '' : 'none'}

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
                    likes {blog.likes}
                    <button onClick={like}>like</button>
                </div>
                <div>
                    {blog.user.name}
                </div>
            </div>
        </div>
    )
}

export default Blog