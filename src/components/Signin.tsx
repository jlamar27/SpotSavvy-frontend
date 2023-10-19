import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure 'react-router-dom' is version 6.x.x or above

export default function Signin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate(); // This hook is for navigation

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = { username, password };
            console.log(response);
            // Assuming you'll add logic here to handle authentication
        } catch (err) {
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
