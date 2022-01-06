//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logo from './images/icon-left-font-monochrome-white.png';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PasswordUpdate from './pages/PasswordUpdate';
import NotFound from './pages/NotFound';
import { AuthContext } from './helpers/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
//-------------------------//
// Application entry point //
//-------------------------//
function App() {
  //---------------------------------------------//
  // Declares useState hook containing an object //
  //---------------------------------------------//
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false,
  });
  //------------------------------------------------- ----------//
  // Executes this function immediately when the page is opened //
  // If there are an error changes the authState to false       //
  // Else changes the authState to true                         //
  //------------------------------------------------------------//
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users/auth', {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  //-----------------------------------------//
  // Creates a logout function               //
  // Removes the token in the sessionStorage //
  // Changes the authState to false          //
  //-----------------------------------------//
  const logout = () => {
    sessionStorage.removeItem('JWToken');
    setAuthState({
      username: '',
      id: 0,
      status: false,
    });
    window.location.replace('/');
  };
  return (
    //----------------------//
    // Navigation structure //
    //----------------------//
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="App_navbar">
            <h1>
              <img
                src={Logo}
                alt="Logo de Groupomania"
                className="App_navbar_img"
              />
            </h1>
            <div className="App_navbar_links">
              {!authState.status ? (
                <>
                  <Link className="App_navbar_link" to="/login">
                    Connexion
                  </Link>
                  <Link className="App_navbar_link" to="/register">
                    S'enregistrer
                  </Link>
                </>
              ) : (
                <>
                  <Link className="App_navbar_link" to="/">
                    Accueil
                  </Link>
                  <Link className="App_navbar_link" to="/createpost">
                    Poster
                  </Link>
                </>
              )}
            </div>
            <div className="App_navbar_username_logout_container">
              <p className="App_navbar_username">{authState.username}</p>
              {authState.status && (
                <button className="App_navbar_logout" onClick={logout}>
                  Déconnexion
                </button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/PasswordUpdate" exact element={<PasswordUpdate />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
//--------------------------//
// Exports the App function //
//--------------------------//
export default App;
