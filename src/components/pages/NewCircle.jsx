import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'

export default function NewCircle() {
    const [form, setForm] = useState('')
    let navigate = useNavigate()

    const addCircle = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('t')
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/membership/groups/`, {name: form}, options)
            console.log(response.data)
            setForm('')
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    return (
        <div className="newCircle bg-light margin-lr">
            <h2>New Circle</h2>
            <form onSubmit={addCircle}>
                <div>
                    <label htmlFor='name'></label>
                    <input id='name' type='text' placeholder='Enter a name for your new circle' autoComplete='off' onChange={e => setForm(e.target.value)} value={form} required/>
                </div>
                <div>
                    <button className='btn' type="submit">Create Circle!</button>
                </div>
           </form>
        </div>
    )
}