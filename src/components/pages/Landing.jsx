import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"


export default function Landing ({ currentUser }) {
    if (currentUser) return <Navigate to='/profile' />
    return (
        <div className="landing">

        </div>
    )
}