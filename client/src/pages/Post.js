//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../helpers/authContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//------------------------//
// Create a Post function //
//------------------------//
function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  //-----------------------------------------------------------//
  // Check if the user is logged in or not                     //
  // If the user are not logged in redirects to the Login page //
  // Else make a request to GET the post data by is ID         //
  // Checks if the user has a valid JWToken                    //
  //-----------------------------------------------------------//
  useEffect(() => {
    if (!authState.status) {
      navigate('/');
    } else {
      axios
        .get(`http://localhost:3001/posts/byId/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setPost(response.data);
          }
        });
      //-----------------------------------------------------------------//
      // Make a request to GET all the comments associate to the post ID //
      // Checks if the user has a valid JWToken                          //
      //-----------------------------------------------------------------//
      axios
        .get(`http://localhost:3001/comments/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setComments(response.data);
          }
        });
    }
  }, [id]);
  //--------------------------------------------------//
  // Create a function to Add comment                 //
  // Make a POST request including the comment data   //
  // Checks if the user has a valid JWToken           //
  // Get the response and display it as a new comment //
  //--------------------------------------------------//
  const addComment = () => {
    axios
      .post(
        'http://localhost:3001/comments',
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
          const commentToAdd = {
            comment: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment('');
        }
      });
  };
  //-------------------------------------------//
  // Create a function to delete a comment     //
  // Make a DELETE request with the comment id //
  // Checks if the user has a valid JWToken    //
  // Remove the comment by filtering the id    //
  //-------------------------------------------//
  function deleteComment(id) {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { JWToken: sessionStorage.getItem('JWToken') },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  }
  //-------------------------------------------------------------------------//
  // Make a request to POST Like/Unlike toggle                               //
  // Checks if the user has a valid JWToken                                  //
  // If the user has not added a like, then add one                          //
  // Else copy the array, remove the last item and return the modified array //
  //-------------------------------------------------------------------------//
  const likeOrNot = (postId) => {
    axios
      .post(
        'http://localhost:3001/likes',
        { PostId: postId },
        { headers: { JWToken: sessionStorage.getItem('JWToken') } }
      )
      .then((response) => {
        setPost(
          post.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }; // destructuring syntax
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray }; // destructuring syntax
              }
            } else {
              return post;
            }
          })
        );
      });
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="postPage">
      <div className="upSide">
        <div className="post" id="individual">
          <div className="title"> {post.title} </div>
          <div className="message">{post.message}</div>
          <div className="footer">
            {post.username}
            <div className="likeContainer">
              <ThumbUpIcon
                className="like"
                onClick={() => {
                  likeOrNot(post.id);
                }}
              />
              <p>{post.Likes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="downSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder=" Commentaire..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Valider</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.comment}
                <div className="commentDelete">
                  {comment.username}
                  {authState.username === comment.username && (
                    <DeleteIcon
                      className="deleteIcon"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
//--------------------------//
// Export the Post function //
//--------------------------//
export default Post;
