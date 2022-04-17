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
	const [showEdit, setShowEdit] = useState(false)
    const [editForm, setEditForm] = useState({name: ''})
	const [memberAdd, setMemberAdd] = useState(false)
	const [memberDel, setMemberDel] = useState(false)
    const [memberForm, setMemberForm] = useState({username: ''})

	// USE-EFFECT
	useEffect(() => {
		(async () => {
			try {
				const token = localStorage.getItem("t")
				const options = {
					headers: {
						Authorization: `Token ${token}`
					}
				}
				// console.log(options)
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${id}`, options)
				// console.log(response.data);
				setCircle(response.data.circle)
				setUsers(response.data.users)
				setDiscussions(response.data.discussions)
			} catch (err) {
				console.log(err.response.data)
				navigate('/')
			}
		})()
	}, [showEdit, memberAdd, memberDel])

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

    const handleDelete = async (discussionId) => {
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
            ` ${user} `
        )
    })

    const discussionList = discussions.map((discussion,idx) => {
        return (
            <div key={idx} className="card">
                <Link to={`/discussions/${discussion.id}`}>
                    <h2>{discussion.name}</h2>
                    <h3>{discussion.description}</h3>
                </Link>
                {currentUser.userId === discussion.admin.toString() && showEdit && <button onClick={() => handleDelete(discussion.id)} className="btn-dlt animate__animated animate__infinite animate__pulse"><i className="fas fa-times-circle"></i></button>}
            </div>
        )
    })

    return (
        <>
            {circle && <h1>Circle - {circle.name}</h1>}
			{circle && currentUser.userId === circle.admin.toString() && (
                <>
                    <button onClick={()=> setShowEdit(!showEdit)}>{showEdit ? 'Done' : 'Edit'}</button>
                    <button onClick={()=> setMemberAdd(!memberAdd)}>{memberAdd ? 'Back' : 'Add New Member'}</button>
                    <button onClick={()=> setMemberDel(!memberDel)}>{memberDel ? 'Back' : 'Remove a Member'}</button>
                </>
            )}
            {showEdit && (
                <form onSubmit={editCircle}>
                    <label htmlFor='name'></label>
                    <input id='name' type='text' placeholder='Enter a new name for your circle' autoComplete='off' onChange={e => setEditForm({...editForm, name: e.target.value})} value={editForm.name}/>
                    <button type="submit">Change Name</button>
                </form>
            )}
            {memberAdd && (
                <form onSubmit={addMember}>
                    <label htmlFor='username'></label>
                    <input id='username' type='text' placeholder='Enter username of new member' autoComplete='off' onChange={e => setMemberForm({...memberForm, username: e.target.value})} value={memberForm.username}/>
                    <button type="submit">Add Member!</button>
                </form>
            )}
            {memberDel && (
                <form onSubmit={deleteMember}>
                    <label htmlFor='username'></label>
                    <input id='username' type='text' placeholder='Enter username to remove' autoComplete='off' onChange={e => setMemberForm({...memberForm, username: e.target.value})} value={memberForm.username}/>
                    <button type="submit">Remove Member</button>
                </form>
            )}
            <p>members: {userList}</p>
            {discussionList}
        </>
    )
}