import { useState } from "react"

const BlogForm = ({handleCreate, user}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        const newBlog = {
            title: title,
            author: author,
            url: url,
            user: user
        }
        setTitle('')    
        setAuthor('')
        setUrl('')
        handleCreate(event, newBlog)
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input 
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    author:
                    <input 
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    url:
                    <input 
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({target}) => setUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm