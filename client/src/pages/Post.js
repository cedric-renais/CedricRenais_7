//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Navbar from '../components/Navbar';

function Post() {
  //----------------------------------------------------------------//
  // Declares useParams, useNavigate, useState and useContext hooks //
  //----------------------------------------------------------------//
  let { id } = useParams();
  let navigate = useNavigate();
  const [post, setPost] = useState('');
  const [postForm, setPostForm] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState();

  //---------------------------------------------------------------------//
  // Executes this function immediately when the page the page is opened //
  //---------------------------------------------------------------------//
  useEffect(() => {
    //--------------------------------------------//
    // Makes GET request to get the post by is id //
    //--------------------------------------------//
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setPost(res.data);
      });
  }, []);

  const updatePost = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('content', content);
    data.append('image', image);
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.replace(`/home/${id}`);
      });
  };
  //--------------------------------------------------//
  // Makes a DELETE request to delete the post        //
  // Checks if the user has a valid token             //
  // Redirects to the Home page after deleting a post //
  //--------------------------------------------------//
  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        navigate('/home');
      });
  };

  return (
    <div className="page_container">
      <Navbar />
      <div className="post_container">
        <div className="post">
          {postForm === false && (
            <>
              <div
                onClick={() => setPostForm(!postForm)}
                className="post_content"
              >
                {post.content}
              </div>
              <div className="post_image">
                {post.image && (
                  <>
                    <img src={post.image} alt="illustration du post" />
                  </>
                )}
              </div>
            </>
          )}
          {postForm && (
            <>
              <form className="create_form" onSubmit={updatePost}>
                <textarea
                  name="content"
                  id="content"
                  defaultValue={post.content}
                  onChange={(event) => setContent(event.target.value)}
                  aria-label="quoi de neuf"
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpeg, .jpg, .png, .gif, .webp"
                  onChange={(event) => setImage(event.target.files[0])}
                  aria-label="ajouter une image"
                />
                <button
                  className="create_button"
                  type="submit"
                  aria-label="valider"
                >
                  <DoneIcon />
                </button>
              </form>
            </>
          )}
          <div className="post_footer">
            <div className="post_username">
              <p>{post.username}</p>
            </div>
            <div className="post_buttons">
              <DeleteIcon
                className="post_button_delete"
                onClick={() => {
                  deletePost(post.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
