import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"


export default function Landing ({ currentUser }) {
    if (currentUser) return <Navigate to={`/profile/${currentUser.userId}`} />
    return (
        <div className="landing">

        </div>
    )
}