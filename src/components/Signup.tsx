import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { postData } from '../api/api'
import { useAuth } from '../context/authContext'

export default function SignUp() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [location, setLocation] = useState<number>(0)
    const { login } = useAuth()

   
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await postData('/path/to/signup/api', { username, password, location });
            if (response.ok) {
                // here you can decide to log the user in directly
                // or redirect them to the login page
                console.log('User registered successfully');
            } else {
                console.log('Registration failed');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10)
        setLocation(newValue)
        console.log(location)
    }

    return (
        <div>
            <div className='signup-container'>
                <h1 className='signup-title'>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className='username-password'>
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='location'>
                        <input
                            type="number"
                            placeholder='ZIP Code'
                            value={location}
                            onChange={handleLocationChange}
                            required
                        />
                    </div>
                    <button>Signup</button>
                </form>
                <span className='signup-alt'>
                    {'Already a user? '}
                    <Link to="/auth/signin">Go to Sign In</Link>
                </span>
            </div>
        </div>
    )
}
