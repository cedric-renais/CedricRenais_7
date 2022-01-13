import React, { useContext, useState } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';

function UpdatePassword() {
  const { authState } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordForm, setPasswordForm] = useState(false);

  const handleUpdatePassword = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/update/${authState.id}`,
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
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          window.location.replace('/user');
        }
      });
  };

  return (
    <div className="user_password">
      {passwordForm === false && (
        <>
          <button
            onClick={() => setPasswordForm(!passwordForm)}
            aria-label="modifier"
          >
            Modifier votre mot de passe
          </button>
        </>
      )}
      {passwordForm && (
        <>
          <input
            placeholder="Votre mot de passe actuel"
            type="password"
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
          />
          <input
            placeholder="Votre nouveau mot de passe"
            type="password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
          <button onClick={handleUpdatePassword}>
            <DoneIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default UpdatePassword;
