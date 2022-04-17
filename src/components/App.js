import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from "react"

import "../App.css"

import Layout from "./layout/Layout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Error from "./pages/Error"
// import About from "./pages/About";
import Profile from "./pages/Profile"
import Circle from "./pages/Circle";
import Discussion from "./pages/Discussion";
import Picture from "./pages/Picture"
import UploadPicture from "./pages/UploadPicture"
import UploadProfilePic from "./pages/UploadProfilePic"

function App() {
  // STATE
  // state with the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  // USE-EFFECT
  // useEffect that handles localstorage if the user navigates away from the page/refreshes
  useEffect(() => {
    const token = localStorage.getItem('t')
    const userId = localStorage.getItem('userId')
    const user = localStorage.getItem('user')

    // if a token is found, log the user in; otherwise, make sure they are logged out
    if (token) {
      setCurrentUser({
        token: token,
        userId: userId,
        user: user
      })
    } else {
      setCurrentUser(null)
    }
  }, []);

  // logout handler function that deletes a token from localstorage
  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem("t")) localStorage.removeItem("t")
    if (localStorage.getItem("userId")) localStorage.removeItem("userId")
    if (localStorage.getItem("user")) localStorage.removeItem("user")
    // set the user state to be null
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Router>
        <Layout handleLogout={handleLogout} currentUser={currentUser}>
          <Routes>

            <Route path="/" element={<Landing currentUser={currentUser} />} />

            <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />

            <Route path="/register" element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />} />

            {/* <Route path="/about" element={<About />} /> */}

            <Route path="/profiles/:id" element={<Profile currentUser={currentUser} />} />

            <Route path="/groups/:id" element={<Circle currentUser={currentUser} />} />

            <Route path="/discussions/:id" element={<Discussion currentUser={currentUser} />} />

            {/* <Route path="/pictures/:id" element={<Picture currentUser={currentUser} />} /> */}

            {/* <Route path="/new" element={<UploadPicture currentUser={currentUser} />} /> */}

            {/* <Route path="/uploadprofilepic/:id" element={<UploadProfilePic currentUser={currentUser} />} /> */}
            <Route path='*' element={<Error />} />

          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
