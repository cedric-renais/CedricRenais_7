//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';
//--------------------------//
// Creates Profile function //
//--------------------------//
function Profile() {
  //---------------------------------------------------//
  // Declares useParams, useState and useContext hooks //
  //---------------------------------------------------//
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  //------------------------------------------------------------//
  // Executes this function immediately when the page is opened //
  //------------------------------------------------------------//
  useEffect(() => {
    //-----------------------------------//
    // Makes GET request to get username //
    //-----------------------------------//
    axios.get(`http://localhost:3001/users/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    //--------------------------------------------//
    // Makes GET request to get the list of posts //
    //--------------------------------------------//
    axios.get(`http://localhost:3001/posts/user/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  //-----------------------------------------//
  // Makes DELETE request to delete the user //
  //-----------------------------------------//
  const deleteProfile = (id) => {
    //-----------------------------------------//
    // Makes DELETE request to delete the user //
    //-----------------------------------------//
    axios
      .delete(`http://localhost:3001/users/profile/${id}`, {
        headers: {
          GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
        },
      })
      .then(() => {
        sessionStorage.removeItem('GROUPOMANIA_TOKEN');
        alert('Votre compte a bien été supprimé.');
        window.location.replace('/');
      });
  };
  return (
    <div className="profilePage">
      <div className="profilePage_info">
        <div className="profilePage_info_username">
          <h1>{username}</h1>
        </div>
        <div className="profilePage_info_button">
          {authState.username === username && (
            <button
              onClick={() => {
                navigate('/password');
              }}
            >
              Modifier mon mot de passe
            </button>
          )}
          {authState.username === username && (
            <button
              onClick={() => {
                deleteProfile(id);
              }}
            >
              Supprimer mon compte
            </button>
          )}
        </div>
      </div>
      <div className="profilePage_posts">
        <p>Les publications de {username}</p>
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="posts_single">
              <div className="posts_single_header"> {value.title} </div>
              <div
                className="posts_single_body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.message}
              </div>
              <div className="posts_single_footer">
                <div className="posts_single_footer_username">
                  {value.username}
                </div>
                <div className="posts_single_footer_buttons">
                  <ThumbUpIcon className="posts_single_footer_buttons_like" />
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
//--------------------------//
// Exports Profile function //
//--------------------------//
export default Profile;
