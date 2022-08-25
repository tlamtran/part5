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
    const [errorMessage, setErrorMessage] = useState(null)

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

        }
        catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout( () => {
                setErrorMessage(null)
            }, 5000)
        }
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
                {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
            </div>
        )
    }

    return (
        <div>
            <Notification message={errorMessage}/>
            {
                user
                    ? blogForm()
                    : loginForm()
            }
        </div>
    )
}

export default App
