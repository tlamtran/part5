import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageStyle, setMessageStyle] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs(blogs)
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

    const handleLogin = async credentials => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)

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

    const handleCreate = async newBlog => {
        blogFormRef.current.toggleVisibility()
        await blogService.create(newBlog)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)

        setMessageStyle('success')
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout( () => {
            setMessage(null)
        }, 5000)
    }

    const handleLike = async blog => {
        await blogService.incrementLike(blog)
    }

    const handleRemove = async blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(blog)
            setBlogs(blogs.filter( b => b.id !== blog.id ))
        }
    }

    if (user) {
        return(
            <div>
                <Notification message={message} style={messageStyle}/>
                <h2>blogs</h2>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
                    <BlogForm handleCreate={handleCreate} user={user}/>
                </Toggleable>
                {
                    blogs
                        .sort( (a,b) => b.likes - a.likes )
                        .map(blog =>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                user={user}
                                blogs={blogs}
                                setBlogs={setBlogs}
                                handleRemove={handleRemove}
                                handleLike={handleLike}
                            />
                        )
                }
            </div>
        )
    }

    else {
        return(
            <div>
                <h2>log in to application</h2>
                <Notification message={message} style={messageStyle}/>
                <LoginForm handleLogin={handleLogin}/>
            </div>
        )
    }
}

export default App
