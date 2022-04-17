import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

// import PostForm from "../partials/PostForm"
import Post from "../partials/Post"

export default function Discussion({ currentUser }) {
    // PARAMS
	const { id } = useParams()
	let navigate = useNavigate()

    // STATE
	const [discussion, setDiscussion] = useState(null)
	const [posts, setPosts] = useState([])
    const [postForm, setPostForm] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [editForm, setEditForm] = useState({
        name: '',
        description: ''
    })
    const [actions, setActions] = useState(0)


	// USE-EFFECT
	useEffect(() => {
        (async () => {
            try {
                // console.log('firing')
				const token = localStorage.getItem("t")
				const options = {
					headers: {
						Authorization: `Token ${token}`
					}
				}
				// console.log(options)
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/discussions/${id}/`, options)
				// console.log(response.data);
				setDiscussion(response.data.discussion)
				setPosts(response.data.posts)
			} catch (err) {
				console.log(err.response.data)
				navigate('/')
			}
		})()
	}, [showEdit, actions])

    // FUNCTIONS
    const editDiscussion = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            // console.log(options)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/discussions/${id}/`, editForm, options)
            // console.log(response.data);
            setEditForm({name: '',description: ''})
            setShowEdit(!showEdit)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const addPost = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            const data = {
                content: postForm,
                discussion_id: id
            }
            // console.log(data)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, data, options)
            // console.log(response.data);
            setPostForm('')
            setActions(actions+1)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    // COMPONENTS
    const postList = posts.map((post,idx) => {
        const time = new Date(post.time_posted).toString()
        return (
            <Post key={`Post-${idx}`} currentUser={currentUser} post={post} time={time} actions={actions} setActions={setActions} />
        )
    })
    
    return (
        <>
            {discussion && (
                showEdit? (
                    <form onSubmit={editDiscussion}>
                        <div>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' type='text' placeholder={discussion.name} autoComplete='off' onChange={e => setEditForm({...editForm, name: e.target.value})} value={editForm.name} required />
                        </div>
                        <div>
                            <label htmlFor='description'>Description:</label>
                            <input id='description' type='text' placeholder={discussion.description} autoComplete='off' onChange={e => setEditForm({...editForm, description: e.target.value})} value={editForm.description} required/>
                        </div>
                        <button type="submit">Submit Edits</button>
                    </form>
                ) : (
                    <>
                        <h1>Discussions - {discussion.name}</h1>
                        <h3>{discussion.description}</h3>
                    </>
                )
            )}
            {discussion && currentUser.userId === discussion.admin.toString() && <button onClick={()=> setShowEdit(!showEdit)}>{showEdit ? 'Done' : 'Edit'}</button>}
            {postList}
            <hr />
            <form onSubmit={addPost}>
                <label htmlFor='content'></label>
                <input id='content' type='text' placeholder='Enter a new post...' autoComplete='off' onChange={e => setPostForm(e.target.value)} value={postForm} required/>
                <button type="submit">Post</button>
            </form>
            {/* <PostForm form={form} setForm={setForm} addPost={addPost}/> */}
        </>
    )
}

