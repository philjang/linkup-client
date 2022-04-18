import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout (props) {
    return (
        <>
            <Navbar handleLogout={props.handleLogout} currentUser={props.currentUser}/>
            <main>
                {props.children} {/* where all the routes display */}
            </main>
            <Footer />
        </>
    )
}