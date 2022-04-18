import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Login ({ currentUser, setCurrentUser }) {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [msg, setMsg] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'/membership/login/', form)
            // console.log(response.data)
            const { token } = response.data
            localStorage.setItem('t', token)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('user', response.data.username)
            setCurrentUser({
                token: token,
                userId: response.data.id,
                user: response.data.username
            })
        } catch (err) {
            // console.log(err.response.data)
            console.log(err)
            setMsg(err.response.data.msg)
        }
    }

    // navigate to the user's profile if currentUse is not null
    if (currentUser) return <Navigate to='/' />
    return (
        <div className='bg-light margin-top margin-lr animate__animated animate__zoomIn'>
            <h2>Log In</h2>
            {msg && <p>message from server: {msg}</p>}
            <form onSubmit={handleFormSubmit}>
                <div className='column'>

                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" autoComplete="off" onChange={e => setForm({...form, username: e.target.value})} value={form.username} />
                    
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={e => setForm({...form, password: e.target.value})} value={form.password} />

                    <button className='btn' type="submit">Log In</button>

                </div>
            </form>
        </div>
    )
}