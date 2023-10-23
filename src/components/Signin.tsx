import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getCookie } from '../api/apiConfig'; 

export default function Signin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post('/login/', { username, password });
    
            if (response.status === 200) {
                console.log('Backend response:', response.data);
                localStorage.setItem('csrf_token', response.data.csrf_token);
                // Redirecting to the home page after successful login
                navigate('/'); 
            } else {
                console.error('Failed to authenticate');
            }
        } catch (err) {
            console.error('An error occurred while trying to authenticate:', err);
        }
    }    

    const handleSignupLink = () => {
        navigate('/auth/signup');
    };

    return (
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
                Don't have an account? <span className='signup-link' onClick={handleSignupLink}>Sign up here.</span>
            </p>
        </div>
    );
}
