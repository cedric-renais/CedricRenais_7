//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/User/Upload';
import { AuthContext } from '../helpers/authContext';
import UpdateBio from '../components/User/UpdateBio';
import UpdateEmail from '../components/User/UpdateEmail';
import UpdatePassword from '../components/User/UpdatePassword';

function User() {
  const { authState } = useContext(AuthContext);

  return (
    <div className="user">
      <Navbar />
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image">
            <img src={authState.image} alt="profil" />
            <Upload />
          </div>
        </div>
        <div className="user_rightside">
          <UpdateBio />
          <div className="user_email_password">
            <UpdateEmail />
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
