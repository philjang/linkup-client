import { useState, useEffect } from 'react'
import axios from 'axios'

import Slideshow from '../partials/Slideshow'

export default function Feed ({ currentUser }) {

    // STATE
    const [users, setUsers] = useState([])

    // USE-EFFECT
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`, options)
                // console.log(response.data)
                setUsers(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    },[])

    // FUNCTIONS

    // COMPONENTS
    const usersList = users.map((user, idx) => {
        return <Slideshow key={`user-${idx}`} user={user} />
    })

    return (
        <div className="feed-page animate__animated animate__fadeIn">
            <h1 className='dil'>A Day in the <span className='indv-user'>Life</span></h1>
            <div className='polaroid-container'>
                {usersList}    
            </div>
        </div>
    )
}