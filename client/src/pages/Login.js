//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//-------------------------//
// Create a Login function //
//-------------------------//
function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //---------------------------------------------------------------//
  // Stock username and password in the data variable              //
  // Make a POST request including the data variable               //
  // Get the response and display the response data in the console //
  //---------------------------------------------------------------//
  const loginRequest = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/users/login', data).then((response) => {
      console.log(response.data);
      navigate('/posts');
    });
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="loginContainer">
      <p>Se connecter</p>
      <input
        placeholder=" Nom d'utilisateur..."
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder=" Mot de passe..."
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="buttonLogin" onClick={loginRequest}>
        Connexion
      </button>
      <a className="loginLink" href="/register">
        Pas encore de compte ? Enregistrez vous.
      </a>
    </div>
  );
}
//---------------------------//
// Export the Login function //
//---------------------------//
export default Login;
