//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import './styles/index.css';
import { AuthContext } from './helpers/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Routes from './components/Routes';
//-------------------------//
// Application entry point //
//-------------------------//
function App() {
  //-----------------------//
  // Declare useState hook //
  //-----------------------//
  const [authState, setAuthState] = useState({
    id: 0,
    username: '',
    email: '',
    biography: '',
    image: '',
    isAdmin: false,
    status: false,
  });
  //-----------------------------------------------------------//
  // Execute this function immediately when the page is opened //
  // If there are an error changes the authState to false      //
  // Else changes the authState to true                        //
  //-----------------------------------------------------------//
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/sign/auth`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            biography: res.data.biography,
            image: res.data.image,
            isAdmin: res.data.isAdmin,
            status: true,
          });
        }
      });
  }, []);
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}
//-------------------------//
// Export the App function //
//-------------------------//
export default App;
