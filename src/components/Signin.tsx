import React, {useState} from 'react'
export default function Signin() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault()
        try {
            const response = {username,password}
            console.log(response)
        } catch (err){
        }
    }
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
                />
                <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className='signin-button'>Signin</button>
            </form>
        </div>
    </div>
  )
}