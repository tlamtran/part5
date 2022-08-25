import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageStyle, setMessageStyle] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )    
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.clear()
        blogService.setToken(null)
        setUser(null)

        setMessageStyle('success')
        setMessage('logout succesful')
        setTimeout( () => {
            setMessage(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            setMessageStyle('success')
            setMessage('login successful')
            setTimeout( () => {
                setMessage(null)
            }, 5000)

        }
        catch (exception) {
            setMessageStyle('error')
            setMessage('Wrong username or password')
            setTimeout( () => {
                setMessage(null)
            }, 5000)
        }
    } 

    const handleCreate = () => {
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        setTitle('')    
        setAuthor('')
        setUrl('')

        blogService.create(newBlog)

        setMessageStyle('success')
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout( () => {
            setMessage(null)
        }, 5000)
    }


    const loginForm = () => {
        return(
            <div>
                <h2>log in to application</h2>
                <form onSubmit={handleLogin}>
                <div>
                    username
                    <input 
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}/>
                </div>

                <div>
                    password
                    <input 
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
            </div>
        )
    }

    const blogForm = () => {
        return(
            <div>
                <h2>blogs</h2> 
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <h2>create new</h2>
                <form onSubmit={handleCreate}>
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
                {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
            </div>
        )
    }

    return (
        <div>
            <Notification message={message} style={messageStyle}/>
            {
                user
                    ? blogForm()
                    : loginForm()
            }
        </div>
    )
}

export default App
