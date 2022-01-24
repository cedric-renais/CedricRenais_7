//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/User/Upload';
import UpdateBio from '../components/User/UpdateBio';
import UpdateEmail from '../components/User/UpdateEmail';
import Delete from '../components/User/Delete';
import UpdatePassword from '../components/User/UpdatePassword';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//---------------------------------//
// Starting point of the User page //
//---------------------------------//
function User() {
  //-------------------------//
  // Declaration of the hook //
  //-------------------------//
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  let { id } = useParams();
  //-----------------------------------------------------------//
  // Execute this function immediately when the page is opened //
  //-----------------------------------------------------------//
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setImage(res.data.image);
      });
  }, []);
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <div className="user">
      <Navbar />
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image">
            <img src={image} alt="profil" />
            <Upload />
          </div>
        </div>
        <div className="user_rightside">
          <h1>Profil de {username}</h1>
          <UpdateBio />
          <div className="user_email_password">
            <UpdateEmail />
            <UpdatePassword />
          </div>
          <div>
            <Delete />
          </div>
        </div>
      </div>
    </div>
  );
}
//------------------------------//
// Exportation of the User page //
//------------------------------//
export default User;
