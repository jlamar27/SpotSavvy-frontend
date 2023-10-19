import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api/apiConfig';

export default function SignUp() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            // Make a POST request using axios instance
            console.log(username, password, location)
            console.log(typeof username, typeof password, typeof location)
            const response = await api.post('/signup/', {
                username,
                password,
                location: location.toString() // Convert number to string
            });
            if (response.status === 201) {
                console.log('User registered successfully');
            } else {
                console.log('Registration failed');
            }
        } catch (err) {
            console.log('Error: failed')
            console.error(err);
        }
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocation(newValue);
        console.log(location);
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
                            type="text"
                            placeholder='ZIP Code'
                            value={location}
                            onChange={handleLocationChange}
                            pattern="\d*" // Ensure only digits can be entered
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
    );
}