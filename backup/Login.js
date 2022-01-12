//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';
//------------------------//
// Creates Login function //
//------------------------//
function Login() {
  //-----------------------------------------------------//
  // Declares useNavigate, useState and useContext hooks //
  //-----------------------------------------------------//
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
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
    const data = { email: email, password: password };
    axios
      .post(`${process.env.REACT_APP_API_URL}api/sign/signin`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem('JWToken', response.data.token);
          setAuthState({
            email: response.data.email,
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
          aria-label="votre adresse email"
          className="login_form_input"
          placeholder="Votre adresse email..."
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          aria-label="Votre mot de passe"
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
