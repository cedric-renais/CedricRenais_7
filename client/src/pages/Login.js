//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
//------------------------//
// Creates Login function //
//------------------------//
function Login() {
  //-----------------------------------------------------//
  // Declares useNavigate, useState and useContext hooks //
  //-----------------------------------------------------//
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useContext(AuthContext);
  //------------------------------------------------------//
  // Creates an onClick function containing the form data //
  // Makes a POST request including the data              //
  // If any error occurs displays it as an alert          //
  // Else Sends the token to the sessionStorage           //
  // Changes the authState to true
  // Redirects to the main page                           //
  //------------------------------------------------------//
  const onClick = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/users/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem('GROUPOMANIA_TOKEN', response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate('/');
      }
    });
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="login">
      <h1>Se connecter</h1>
      <div className="login_form">
        <input
          className="login_form_input"
          placeholder="Votre nom d'utilisateur..."
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="login_form_input"
          placeholder="Votre mot de passe..."
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="login_form_button" onClick={onClick}>
          Valider
        </button>
        <a className="login_form_link" href="/register">
          Pas encore de compte ? Enregistrez-vous !
        </a>
      </div>
    </div>
  );
}
//------------------------//
// Exports Login function //
//------------------------//
export default Login;
