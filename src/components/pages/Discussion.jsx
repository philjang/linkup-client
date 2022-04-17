import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Discussion() {
    // PARAMS
	const { id } = useParams()
	let navigate = useNavigate()

    // STATE
	const [discussion, setDiscussion] = useState(null)
	const [posts, setPosts] = useState([])


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
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/discussions/${id}/`, options)
				// console.log(response.data);
				setDiscussion(response.data.discussion)
				setPosts(response.data.posts)
			} catch (err) {
				console.log(err.response.data)
				navigate('/')
			}
		})()
	}, [])
    
    return (
        <h1>Discussion</h1>
    )
}

