import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import { useParams } from 'react-router-dom';

function UpdatePassword() {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordForm, setPasswordForm] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setEmail(res.data.email);
      });
  }, []);

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
          window.location.replace(`/user/${authState.id}`);
        }
      });
  };

  return (
    <>
      {authState.email === email && (
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
      )}
    </>
  );
}

export default UpdatePassword;
