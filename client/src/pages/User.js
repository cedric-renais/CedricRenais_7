//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/User/Upload';
import { AuthContext } from '../helpers/authContext';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';

function User() {
  const [biography, setBiography] = useState('');
  const [biographyForm, setBiographyForm] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailForm, setEmailForm] = useState(false);
  const { authState } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordForm, setPasswordForm] = useState(false);

  const handleUpdateBio = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('biography', biography);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/update/${authState.id}`,
        data,
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
          setBiography({ ...biography, biography: biography });
          window.location.replace('/user');
        }
      });
  };

  const handleUpdateEmail = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('email', email);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/update/${authState.id}`,
        data,
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
          setEmail({ ...email, email: email });
          window.location.replace('/user');
        }
      });
  };

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
    <div className="user">
      <Navbar />
      <h1>Profil de {authState.username}</h1>
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image">
            <img src={authState.image} alt="profil" />
            <Upload />
          </div>
        </div>
        <div className="user_rightside">
          <div className="user_biography">
            {biographyForm === false && (
              <>
                <p onClick={() => setBiographyForm(!biographyForm)}>
                  {authState.biography}
                </p>
                <button
                  onClick={() => setBiographyForm(!biographyForm)}
                  aria-label="modifier"
                >
                  <EditIcon />
                </button>
              </>
            )}
            {biographyForm && (
              <>
                <form onSubmit={handleUpdateBio}>
                  <textarea
                    type="text"
                    id="biography"
                    name="biography"
                    defaultValue={authState.biography}
                    onChange={(event) => setBiography(event.target.value)}
                  ></textarea>
                  <button type="submit" aria-label="modifier">
                    <DoneIcon />
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="user_email_password">
            <div className="user_email">
              {emailForm === false && (
                <>
                  <button
                    onClick={() => setEmailForm(!emailForm)}
                    aria-label="modifier"
                  >
                    Modifier votre email
                  </button>
                </>
              )}
              {emailForm && (
                <>
                  <form onSubmit={handleUpdateEmail}>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      defaultValue={authState.email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button type="submit" aria-label="modifier">
                      <DoneIcon />
                    </button>
                  </form>
                </>
              )}
            </div>
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
                    placeholder="Votre mot de passe actuel..."
                    type="password"
                    onChange={(event) => {
                      setOldPassword(event.target.value);
                    }}
                  />
                  <input
                    placeholder="Votre nouveau mot de passe..."
                    type="password"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <button onClick={handleUpdatePassword}>Valider</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
