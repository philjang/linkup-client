import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'

export default function Post({ currentUser, post, time, actions, setActions }) {

	let navigate = useNavigate()

    // STATE
    const [showEdit, setShowEdit] = useState(false)
    const [editForm, setEditForm] = useState('')

    // FUNCTIONS
    const editPost = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            const data = {
                content: editForm
            }
            // console.log(data)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${post.id}/`, data, options)
            // console.log(response.data);
            setEditForm('')
            setShowEdit(false)
            setActions(actions+1)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const deletePost = async (e) => {
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/posts/${post.id}/`, options)
            // console.log(response.data);
            setEditForm('')
            setShowEdit(false)
            setActions(actions+1)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    return (
        <div className="post">
            {showEdit ? 
                (
                    <>
                        <form className='bg-light margin-lr animate__animated animate__fadeInLeft' onSubmit={editPost}>
                            <label htmlFor='content'></label>
                            <input id='content' type='text' placeholder={post.content} autoComplete='off' onChange={e => setEditForm(e.target.value)} value={editForm} required/>
                            <button className='btn' type="submit">Submit Edits</button>
                        </form>
                        <button onClick={() => deletePost(post.id)} className="btn-dlt animate__animated animate__infinite animate__pulse"><i className="fas fa-times-circle"></i></button>
                    </>

                 ) :
                 (
                    <div className="card animate__animated animate__bounceIn">
                        <h3>{post.content}</h3>
                        <p>- {post.owner}</p>
                        <p>{time}</p>
                    </div>
                 ) 
            }
            {post.owner === currentUser.user && <button  className='btn' onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Back' : 'Edit Post'}</button>}
        </div>
    )
}