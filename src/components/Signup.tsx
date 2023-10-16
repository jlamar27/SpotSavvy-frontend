import React, { useState } from 'react'
// import { signup } from '../api/auth'

export default function SignUp() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [location, setLocation] = useState<number>(0)


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = {username, password, location}
            console.log(response)
        } catch (err) {

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

                <form action="" onSubmit={handleSubmit}>
                    
                    <div className='username-password'>
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='location'>
                        <input
                            type="number"
                            placeholder='ZIP Code'
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </div>

                    <button>Signup</button>
                </form>


            </div>
        </div>
    )
}
