import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Circle({ currentUser }) {
    // PARAMS
	const { id } = useParams()
	let navigate = useNavigate()

	// STATE
	const [circle, setCircle] = useState(null)
	const [users, setUsers] = useState([])
	const [discussions, setDiscussions] = useState([])
    const [discussionForm, setDiscussionForm] = useState({
        name: '',
        description: '',
        circle_id: id
    })
	const [showEdit, setShowEdit] = useState(false)
    const [editForm, setEditForm] = useState({name: ''})
	const [memberAdd, setMemberAdd] = useState(false)
	const [memberDel, setMemberDel] = useState(false)
    const [memberForm, setMemberForm] = useState({username: ''})
    const [action, setAction] = useState(0)

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
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${id}/`, options)
				// console.log(response.data);
				setCircle(response.data.circle)
				setUsers(response.data.users)
				setDiscussions(response.data.discussions)
			} catch (err) {
				console.log(err.response.data)
				navigate('/')
			}
		})()
	}, [showEdit, memberAdd, memberDel, action])

    // FUNCTIONS
    const editCircle = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            // console.log(options)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${id}/`, editForm, options)
            // console.log(response.data);
            setEditForm({name: ''})
            setShowEdit(!showEdit)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const addMember = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            // console.log(options)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${id}/add/`, memberForm, options)
            // console.log(response.data);
            setMemberForm({username: ''})
            setMemberAdd(!memberAdd)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const deleteMember = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                data: memberForm,
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            // console.log(options)
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${id}/del/`, options)
            // console.log(response.data);
            setMemberForm({username: ''})
            setMemberDel(!memberDel)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const addDiscussion = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("t")
            const options = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            // console.log(data)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/discussions/`, discussionForm, options)
            // console.log(response.data)
            setDiscussionForm({
                name: '',
                description: '',
                circle_id: id
            })
            setAction(action+1)
        } catch (err) {
            console.log(err.response.data)
            navigate('/')
        }
    }

    const deleteDiscussion = async (discussionId) => {
		try {
			const token = localStorage.getItem("t")
			const options = {
				headers: {
					Authorization: `Token ${token}`
				}
			}
			await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/discussions/${discussionId}/`, options)
			setShowEdit(false)
			setShowEdit(true)
		} catch (err) {
			console.log(err)
		}
	}
    
    // COMPONENTS
    const userList = users.map((user,idx) => {
        return (
            `${user}`
        )
    })

    const discussionList = discussions.map((discussion,idx) => {
        return (
            <div key={idx} className="card animate__animated animate__bounceIn">
                <Link to={`/discussions/${discussion.id}`}>
                    <h2>{discussion.name}</h2>
                    <h3>{discussion.description}</h3>
                </Link>
                {currentUser.userId === discussion.admin.toString() && showEdit && <button onClick={() => deleteDiscussion(discussion.id)} className="btn-dlt animate__animated animate__infinite animate__pulse"><i className="fas fa-times-circle"></i></button>}
            </div>
        )
    })

    return (
        <>
            {circle && <h1><i className="fas fa-link"></i>  {circle.name}</h1>}
			{circle && currentUser.userId === circle.admin.toString() && (
                <>
                    <button className='btn' onClick={()=> setShowEdit(!showEdit)}>{showEdit ? 'Done' : 'Edit'}</button>
                    <button className='btn' onClick={()=> setMemberAdd(!memberAdd)}>{memberAdd ? 'Back' : 'Add New Member'}</button>
                    <button className='btn' onClick={()=> setMemberDel(!memberDel)}>{memberDel ? 'Back' : 'Remove a Member'}</button>
                </>
            )}
            {showEdit && (
                <form className='white-form' onSubmit={editCircle}>
                    <label htmlFor='name'></label>
                    <input id='name' type='text' placeholder='Enter a new name for your circle' autoComplete='off' onChange={e => setEditForm({...editForm, name: e.target.value})} value={editForm.name} required/>
                    <button className='btn' type="submit">Change Name</button>
                </form>
            )}
            {/* todo - make more DRY */}
            {memberAdd && (
                <form className='white-form' onSubmit={addMember}>
                    <label htmlFor='username'></label>
                    <input id='username' type='text' placeholder='Enter username of new member' autoComplete='off' onChange={e => setMemberForm({...memberForm, username: e.target.value})} value={memberForm.username} required/>
                    <button className='btn' type="submit">Add Member!</button>
                </form>
            )}
            {memberDel && (
                <form className='white-form' onSubmit={deleteMember}>
                    <label htmlFor='username'></label>
                    <input id='username' type='text' placeholder='Enter username to remove' autoComplete='off' onChange={e => setMemberForm({...memberForm, username: e.target.value})} value={memberForm.username} required/>
                    <button className='btn' type="submit">Remove Member</button>
                </form>
            )}
            <p className='primary-text'>members: {userList.join(', ')}</p>
            {discussionList}
            <div className="bg-light column margin-lr">
                <h3>Add a New Discussion:</h3>
                {circle && <><form onSubmit={addDiscussion}>
                    <div>
                        <label htmlFor='name'></label>
                        <input id='name' type='text' placeholder='Enter name...' autoComplete='off' onChange={e => setDiscussionForm({...discussionForm, name: e.target.value})} value={discussionForm.name} required />
                    </div>
                    <div>
                        <label htmlFor='description'></label>
                        <input id='description' type='text' placeholder='Enter description...' autoComplete='off' onChange={e => setDiscussionForm({...discussionForm, description: e.target.value})} value={discussionForm.description} required/>
                    </div>
                    <button className='btn' type="submit">Create Discussion!</button>
                </form></>}
            </div>
        </>
    )
}