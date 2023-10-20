import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api/apiConfig';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [made, setMade] = useState<boolean>(false);
    const navigate = useNavigate()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            console.log(username, password, location)
            console.log(typeof username, typeof password, typeof location)
            const response = await api.post('/signup/', {
                username,
                password,
                location: location.toString() // Convert number to string
            });
            if (response.status === 201) {
                console.log('User registered successfully');
                setMade(true)
                setTimeout(() => {
                    navigate('/auth/signin')
                }, 1200)
            } else {
                console.log('Registration failed');
            }
        } catch (err) {
            console.log('Error: failed')
            console.error(err);
        }
    }


    return (
        <div>
            <div className='signup-container'>
                <h1 className='signup-title'>Signup</h1>
                {made &&
                    <span>created account!!</span>
                }
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
                            onChange={e => setLocation(e.target.value)}
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