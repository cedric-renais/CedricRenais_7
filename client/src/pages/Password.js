//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//---------------------------//
// Creates Password function //
//---------------------------//
function Password() {
  //-----------------------------------------//
  // Declares useNavigate and useState hooks //
  //-----------------------------------------//
  let navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  //--------------------------------------------//
  // Makes a PUT request to update the password //
  //--------------------------------------------//
  const changePassword = () => {
    axios
      .put(
        'http://localhost:3001/api/users/password',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
    alert('Mot de passe mis à jour.');
    navigate('/');
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="passwordPage">
      <h1>Modifier votre mot de passe</h1>
      <div className="passwordPage_form">
        <input
          className="passwordPage_form_input"
          placeholder="Votre mot de passe actuel..."
          type="password"
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          className="passwordPage_form_input"
          placeholder="Votre nouveau mot de passe..."
          type="password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button className="passwordPage_form_button" onClick={changePassword}>
          Valider
        </button>
      </div>
    </div>
  );
}
//---------------------------//
// Exports Password function //
//---------------------------//
export default Password;
