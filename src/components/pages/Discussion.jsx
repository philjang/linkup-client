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

    // FUNCTIONS

    // COMPONENTS
    const postList = posts.map((post,idx) => {
        const time = new Date(post.time_posted).toString()
        return (
            <div key={idx} className="card">
                <hr />
                <h3>{post.content}</h3>
                <p>- {post.owner}</p>
                <p>{time}</p>
            </div>
        )
    })
    
    return (
        <>
            {discussion && <h1>Discussions - {discussion.name}</h1>}
            {postList}
        </>
    )
}

