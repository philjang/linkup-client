import axios from 'axios'
import { useState } from 'react'

import CommentForm from '../partials/CommentForm'

export default function Comment({ comment, currentUser, photoId, actions, setActions }) {
    // reformat datestring to be more readable for users
    let date = new Date(comment.createdAt)
    date = date.toString()
    date = date.substring(0, 21)

    // STATE
    const [editComment, setEditComment] = useState(false)
    const [commentForm, setCommentForm] = useState('')

    // FUNCTIONS
    // Edits a comment corresponding to comment ID
    const putComment = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${comment._id}`, { name: currentUser.name, content: commentForm, photoId: photoId}, options)
            // console.log(response.data)
            setCommentForm('')
            setEditComment(false)
            setActions(actions+1)
        } catch (err) {
            console.log(err)
        }
    }

    // Deletes a comment corresponding to comment ID
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                data: {
                    photoId: photoId
                },
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${comment._id}`, options)
            // console.log(response.data)
            setEditComment(false)
            setActions(actions+1)
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className='comment'>
            <hr />
            {editComment ? 
                (
                    <>
                        <CommentForm handleSubmit={putComment} commentForm={commentForm} setCommentForm={setCommentForm} /> 
                        <button className='btn-dlt animate__animated animate__infinite animate__pulse' onClick={handleDelete}><i className="far fa-times-circle"></i></button>
                    </>
                 ) : 
                    <>
                        <p>{comment.content}</p>
                        <h5>{'- '+comment.name}</h5>
                    </>
            }   
            <h6>Date posted: {date}</h6>
            
            {comment.user_id === currentUser.id && <button className='btn-edit' onClick={() => setEditComment(!editComment)}>{editComment ? 'back' : 'edit comment'}</button>}
        </div>
    )
}