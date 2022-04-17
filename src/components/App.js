import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import "../App.css";

import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
// import About from "./pages/About";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Picture from "./pages/Picture";
import axios from "axios";
import UploadPicture from "./pages/UploadPicture";
import UploadProfilePic from "./pages/UploadProfilePic";

function App() {
  // STATE
  // state with the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null);

  // USE-EFFECT
  // useEffect that handles localstorage if the user navigates away from the page/refreshes
  useEffect(() => {
    const token = localStorage.getItem("t");
    // if a token is found, log the user in; otherwise, make sure they are logged out
    if (token) {
      setCurrentUser(token);
    } else {
      setCurrentUser(null);
    }

  }, []);
  // logout handler function that deletes a token from localstorage
  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem("t")) localStorage.removeItem("t");
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

            <Route path="/profile" element={<Profile />} />

            <Route path="/profiles/:id" element={<Profile currentUser={currentUser} handleLogout={handleLogout} />} />

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
