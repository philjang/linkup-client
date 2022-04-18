import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Landing ({ currentUser }) {
    if (currentUser) return <Navigate to={`/profiles/${currentUser.userId}`} />
    return (
        <div className="landing flex-center">
            <h1 className="animate__animated animate__jackInTheBox">Linkup</h1>
        </div>
    )
}