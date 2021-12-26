//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
//-----------------------//
// Creates Post function //
//-----------------------//
function Post() {
  //----------------------------------------------------------------//
  // Declares useParams, useNavigate, useState and useContext hooks //
  //----------------------------------------------------------------//
  let { id } = useParams();
  let navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewcomment] = useState('');
  const { authState } = useContext(AuthContext);
  //---------------------------------------------------------------------//
  // Executes this function immediately when the page the page is opened //
  //---------------------------------------------------------------------//
  useEffect(() => {
    //--------------------------------------------//
    // Makes GET request to get the post by is id //
    //--------------------------------------------//
    axios.get(`http://localhost:3001/posts/post/${id}`).then((response) => {
      setPost(response.data);
    });
    //-----------------------------------------------------------------//
    // Makes GET request to get all the comments associate to the post //
    //-----------------------------------------------------------------//
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);
  //--------------------------------------------------------//
  // Makes a POST request to add a new comment to this post //
  // Checks if the user has a valid token                   //
  // Returns the response as a new comment                  //
  //--------------------------------------------------------//
  const AddComment = () => {
    axios
      .post(
        'http://localhost:3001/comments',
        {
          comment: newComment,
          PostId: id,
        },
        {
          headers: {
            GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const CommentToAdd = {
            comment: response.data.comment,
            username: response.data.username,
            id: response.data.id,
          };
          setComments([...comments, CommentToAdd]);
          setNewcomment('');
          console.log('New comment added.');
        }
      });
  };
  //------------------------------------------------------------------//
  // Makes a DELETE request to remove a specific comment to this post //
  // Checks if the user has a valid token                             //
  // Returns the response as a new comment                            //
  //------------------------------------------------------------------//
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
        },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };
  //--//
  // Makes a DELETE request to delete the post //
  //--//
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
        },
      })
      .then(() => {
        console.log('Post deleted.');
        navigate('/');
      });
  };
  //---------------------------------------------------//
  // Returns the data and display it by injecting HTML //
  //---------------------------------------------------//
  return (
    <div className="postPage">
      <div className="postPage_top">
        <div className="postPage_top_single">
          <div className="postPage_top_single_header">{post.title}</div>
          <div className="postPage_top_single_body">{post.message}</div>
          <div className="postPage_top_single_footer">
            {post.username}
            {authState.username === post.username && (
              <DeleteIcon
                onClick={() => {
                  deletePost(post.id);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="postPage_bottom">
        <div className="postPage_bottom_AddComment">
          <textarea
            className="postPage_bottom_AddComment_input"
            name="Addcomment"
            placeholder="Votre commentaire..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewcomment(event.target.value);
            }}
          />
          <button
            className="postPage_bottom_AddComment_button"
            onClick={AddComment}
          >
            Valider
          </button>
        </div>
        <div className="postPage_bottom_comments">
          {comments.map((comment, key) => {
            return (
              <div className="postPage_bottom_comments_single" key={key}>
                {comment.comment}
                <p>
                  {comment.username}
                  {authState.username === comment.username && (
                    <DeleteIcon
                      className="postPage_bottom_comments_single_delete"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
//-----------------------//
// Exports Post function //
//-----------------------//
export default Post;
