import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Profile({ currentUser }) {
	// PARAMS
	const { id } = useParams()
	let navigate = useNavigate()

	// STATE
	// const [user, setUser] = useState(null)
	const [circles, setCircles] = useState([])
	const [showEdit, setShowEdit] = useState(false)

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
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/membership/users/${id}/`, options)
				// console.log(response.data);
				// setUser(response.data.user)
				setCircles(response.data.circles)
			} catch (err) {
				console.log(err.response.data)
				navigate('/')
			}
		})()
	}, [showEdit])

	// FUNCTIONS
	const handleDelete = async (circleId) => {
		try {
			const token = localStorage.getItem("t")
			const options = {
				headers: {
					Authorization: `Token ${token}`
				}
			}
			await axios.delete(`${process.env.REACT_APP_SERVER_URL}/membership/groups/${circleId}/`, options)
			setShowEdit(false)
			setShowEdit(true)
		} catch (err) {
			console.log(err)
		}
	}

	// COMPONENTS
	const groupList = circles.map((circle,idx) => {
		return (
			<div key={idx} className='card animate__animated animate__bounceIn'>
				<Link to={`/groups/${circle.id}`}>
					<h2>{circle.name}</h2>
				</Link>
				{currentUser.userId === circle.admin.toString() && showEdit && <button onClick={() => handleDelete(circle.id)} className="btn-dlt animate__animated animate__infinite animate__pulse"><i className="fas fa-times-circle"></i></button>}
			</div>
		)
	})

	return (
		<div className="profile">
			<h1 className="animate__animated animate__bounceIn">My Circles</h1>
			<button onClick={()=> setShowEdit(!showEdit)}>{showEdit ? 'Done' : 'Edit'}</button>
			{groupList}
		</div>
	)
}
