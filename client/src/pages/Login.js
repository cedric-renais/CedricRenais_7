//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
//-------------------------//
// Create a Login function //
//-------------------------//
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //---------------------------------------------------------------//
  // Stock username and password in the data variable              //
  // Make a POST request including the data variable               //
  // Get the response and display the response data in the console //
  //---------------------------------------------------------------//
  const loginRequest = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/login', data).then((response) => {
      console.log(response.data);
    });
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="loginContainer">
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
    </div>
  );
}
//---------------------------//
// Export the Login function //
//---------------------------//
export default Login;
