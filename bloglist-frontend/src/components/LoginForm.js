import { useState } from "react"

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async (event) => {
        event.preventDefault()
        const credentials = {
            username, password
        }
        handleLogin(credentials)
        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <form onSubmit={login}>
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

export default LoginForm