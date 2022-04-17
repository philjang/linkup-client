import { Link } from 'react-router-dom'

export default function Navbar ({ handleLogout, currentUser }) {
    // if the user is logged in
    const loggedIn = (
        <>
            {/* if the user is logged in */}
            {currentUser ? <Link to={`/profiles/${currentUser.id}`} className='nav-link'>My Profile</Link> : null}
            <Link to='/new' className= 'nav-link'>New Circle</Link>
            <Link to='/' className='nav-link'>
                <span onClick={handleLogout}>Log Out</span>
            </Link>
            
        </>
    )
    // if the user is logged out
    const loggedOut = (
        <>
            {/* if the user is logged out */}
            <Link to='/register' className='nav-link'>Sign Up</Link>
            <Link to='/login' className='nav-link'>Log In</Link>
        </>
    )

    return (
        <nav>
            <Link to='/' className='nav-link'>Home</Link>
            {/* <Link to='/about' className='nav-link'>  About  </Link> */}
            {currentUser ? loggedIn : loggedOut}
        </nav>
    )
}