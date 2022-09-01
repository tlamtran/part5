import { useState, useEffect } from 'react'
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

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
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

    const handleLogin = async (event, credentials) => {
        event.preventDefault()
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

    const handleCreate = (event, newBlog) => {
        event.preventDefault()
        setBlogs(blogs.concat(newBlog))
        blogService.create(newBlog)

        setMessageStyle('success')
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout( () => {
            setMessage(null)
        }, 5000)
    }
    

    if (user) {
        return(
            <div>
                <Notification message={message} style={messageStyle}/>
                <h2>blogs</h2> 
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <Toggleable buttonLabel="new blog">
                    <BlogForm handleCreate={handleCreate} />
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
