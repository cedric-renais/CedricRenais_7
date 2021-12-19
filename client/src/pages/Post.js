//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
  //----------------------------------------------//
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPost(response.data);
    });
    //-----------------------------------------------------------------//
    // Make a request to GET all the comments associate to the post ID //
    //-----------------------------------------------------------------//
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);
  //--------------------------------------------------//
  // Create a function to Add comment                 //
  // Make a POST request including the comment data   //
  // Get the response and display it as a new comment //
  //--------------------------------------------------//
  const addComment = () => {
    axios
      .post('http://localhost:3001/comments', {
        comment: newComment,
        PostId: id,
      })
      .then((response) => {
        const commentToAdd = { comment: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment('');
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
          <div className="username">{post.username}</div>
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
