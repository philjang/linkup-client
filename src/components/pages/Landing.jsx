import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Landing ({ currentUser }) {
    if (currentUser) return <Navigate to={`/profiles/${currentUser.userId}`} />
    return (
        <div className="landing">
            <h1>Linkup</h1>
        </div>
    )
}