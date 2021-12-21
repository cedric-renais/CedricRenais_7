//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
//------------------------//
// Create a Post function //
//------------------------//
function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  //----------------------------------------------//
  // Make a request to GET the post data by is ID //
  // Checks if the user has a valid JWToken       //
  //----------------------------------------------//
  useEffect(() => {
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
  }, [id]);
  //--------------------------------------------------//
  // Create a function to Add comment                 //
  // Make a POST request including the comment data   //
  // Get the response and display it as a new comment //
  // Checks if the user has a valid JWToken           //
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
  //---------------------------------------//
  // Create a function to delete a comment //
  //---------------------------------------//
  const deleteComment = (id) => {
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
          <div className="footer">{post.username}</div>
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
                  de {comment.username}
                  <DeleteIcon
                    className="deleteIcon"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  />
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
