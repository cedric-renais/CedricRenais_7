//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//--------------------------//
// Creates Profile function //
//--------------------------//
function Profile() {
  //----------------------------------------//
  // Declares useParams and use State hooks //
  //----------------------------------------//
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [listOfPosts, setListOfPosts] = useState([]);
  //------------------------------------------------------------//
  // Executes this function immediately when the page is opened //
  //------------------------------------------------------------//
  useEffect(() => {
    axios.get(`http://localhost:3001/users/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/user/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="profilePage">
      <div className="profilePage_info">
        <h1>Utilisateur: {username}</h1>
      </div>
      <div className="posts">
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
