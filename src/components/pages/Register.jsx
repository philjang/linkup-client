import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


export default function Register ({ currentUser, setCurrentUser }) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [msg, setMsg] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (form.password === form.password_confirmation) {
            try {
                await axios.post(process.env.REACT_APP_SERVER_URL+'/membership/register/', form)
                const response = await axios.post(process.env.REACT_APP_SERVER_URL+'/membership/login/', form)
                // console.log(response, response.data)
                const { token } = response.data
                localStorage.setItem('t', token)
                localStorage.setItem('currentUser', response.data.id)
                setCurrentUser({
                    token: token,
                    userId: response.data.id
                })
            } catch (err) {
                // console.log(err.response.data)
                setMsg(err.response.data)
            }
        } else setMsg('passwords do not match')
    }

    if (currentUser) return <Navigate to='/profile' />

    // take key-value pairs from server error and put them into an array
    const errorMessages = []
    for (const [key,value] of Object.entries(msg)) {
        errorMessages.push(`${key}: ${value}`)
    }
    // map the array to display the errors to user
    const displayMessages = errorMessages.map((error,idx) => {
        return (
            <p key={idx}>{error}</p>
        )
    })

    return (
        <div className='bg-light margin-lr'>
            <h2 className='sign-up'>Sign Up</h2>
            {/* ternary to display server error or string error if passwords do not match */}
            {msg && typeof msg === 'object' ? (
                <>
                    <p>message from server:</p>
                    {displayMessages}
                </>
            ): <p>{msg}</p>}
            <form onSubmit={handleFormSubmit}>
                <div className='column'>

                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" placeholder='Enter username here...' autoComplete="off" onChange={e => setForm({...form, username: e.target.value})} value={form.username} required />

                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" placeholder='Enter email here...' autoComplete="off" onChange={e => setForm({...form, email: e.target.value})} value={form.email} required />
                    
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" onChange={e => setForm({...form, password: e.target.value})} value={form.password} required />

                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input id="password_confirmation" type="password" onChange={e => setForm({...form, password_confirmation: e.target.value})} value={form.password_confirmation} required />

                    <button className='btn' type="submit">Create My Account</button>

                </div>
            </form>
        </div>
    )
}