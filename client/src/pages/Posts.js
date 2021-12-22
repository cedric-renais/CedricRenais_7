//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//-------------------------//
// Create a Posts function //
//-------------------------//
function Posts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();
  //------------------------------------------------------//
  // Make a request to GET all the posts                  //
  // Checks if the user has a valid JWToken               //
  // If an error occurs display this error in the console //
  // Else display the list of posts                       //
  // Get each like and return the associate PostId        //
  //------------------------------------------------------//
  useEffect(() => {
    axios
      .get('http://localhost:3001/posts', {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        }
      });
  }, []);
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
        setListOfPosts(
          listOfPosts.map((post) => {
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

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]); // destructuring syntax
        }
      });
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="listOfPosts">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="message"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.message}
            </div>
            <div className="footer">
              {value.username}
              <div className="likeContainer">
                <ThumbUpIcon
                  className={likedPosts.includes(value.id) ? 'like' : 'unlike'}
                  onClick={() => {
                    likeOrNot(value.id);
                  }}
                />
                <p>{value.Likes.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
//---------------------------//
// Export the Posts function //
//---------------------------//
export default Posts;
