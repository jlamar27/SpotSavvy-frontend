import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure 'react-router-dom' is version 6.x.x or above
import { postData } from '../api/api';
import { useAuth } from '../context/authContext';

export default function Signin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth(); // This hook is for authentication

    const navigate = useNavigate(); // This hook is for navigation

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await postData('/path/to/login/api', { username, password });
            if (response.ok) {
                const data = await response.json();
                login(data.token);
            } else {
                console.log('Failed to authenticate');
            }
        } catch (err) {
            console.error(err);
        }
    }


    const handleSignupLink = () => {
        navigate('/auth/signup');
    };

    return (
        <div>
            <div className='signin-container'>
                <h1 className='signin-title'>Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type='submit' className='signin-button'>Sign In</button>
                </form>
                <p>
                    Don't have an account? <span className='signup-link' onClick={handleSignupLink} style={{ color: 'blue', cursor: 'pointer' }}>Sign up here.</span>
                </p>
            </div>
        </div>
    );
}
