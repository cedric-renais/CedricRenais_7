//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/authContext';
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
    axios
      .get(`http://localhost:3001/api/posts/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((response) => {
        setPost(response.data);
      });
    //-----------------------------------------------------------------//
    // Makes GET request to get all the comments associate to the post //
    //-----------------------------------------------------------------//
    axios
      .get(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((response) => {
        setComments(response.data);
      });
  }, []);
  //--------------------------------------------------------//
  // Makes a POST request to add a new comment to this post //
  // Checks if the user has a valid token                   //
  // Returns the response as a new comment                  //
  //--------------------------------------------------------//
  const AddComment = () => {
    axios
      .post(
        'http://localhost:3001/api/comments',
        {
          comment: newComment,
          PostId: id,
        },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
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
      .delete(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
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
  //--------------------------------------------------//
  // Makes a DELETE request to delete the post        //
  // Checks if the user has a valid token             //
  // Redirects to the Home page after deleting a post //
  //--------------------------------------------------//
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/api/posts/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        console.log('Post deleted.');
        navigate('/');
      });
  };
  //------------------------------------------------------------------------------------------//
  // If the user click on the title field then makes a PUT request to edit the title          //
  // Checks if the user has a valid token                                                     //
  // Changes the title of the post                                                            //
  // Else if the user click on the message field then makes a PUT request to edit the message //
  // Checks if the user has a valid token                                                     //
  // Changes the message of the post                                                          //
  //------------------------------------------------------------------------------------------//
  const editPost = (option) => {
    if (option === 'title') {
      let editTitle = prompt('Modifier votre titre:');
      axios.put(
        'http://localhost:3001/api/posts/title',
        { editTitle: editTitle, id: id },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      );
      setPost({ ...post, title: editTitle });
    } else {
      let editMessage = prompt('Modifier votre message:');
      axios.put(
        'http://localhost:3001/api/posts/message',
        { editMessage: editMessage, id: id },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      );
      setPost({ ...post, message: editMessage });
    }
  };
  //---------------------------------------------------//
  // Returns the data and display it by injecting HTML //
  //---------------------------------------------------//
  return (
    <div className="postPage">
      <div className="postPage_top">
        <div className="postPage_top_single">
          <div className="postPage_top_single_header">
            <div
              className="postPage_top_single_header_edit"
              onClick={() => {
                if (authState.username === post.username) {
                  editPost('title');
                }
              }}
            >
              {post.title}
            </div>
          </div>
          <div
            className="postPage_top_single_body"
            onClick={() => {
              if (authState.username === post.username) {
                editPost('message');
              }
            }}
          >
            {post.message}
          </div>
          <div className="postPage_top_single_footer">
            <div className="postPage_top_single_footer_username">
              <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
            </div>
            <div>
              {authState.username === post.username && (
                <DeleteIcon
                  className="postPage_top_single_footer_button"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="postPage_bottom">
        <div className="postPage_bottom_AddComment">
          <textarea
            aria-label="Votre commentaire"
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
