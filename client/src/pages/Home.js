//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';
//-----------------------//
// Creates Home function //
//-----------------------//
function Home() {
  //------------------------------------------------------//
  // Declares useNavigate, useStates and useContext hooks //
  //------------------------------------------------------//
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  //---------------------------------------------------------------------//
  // Executes this function immediately when the page the page is opened //
  //---------------------------------------------------------------------//
  useEffect(() => {
    //--//
    // Checks if
    //--//
    if (!sessionStorage.getItem('GROUPOMANIA_TOKEN')) {
      navigate('/login');
    } else {
      //---------------------------------------------------------//
      // Makes a GET request to grab all data in the posts table //
      // Checks if the user has a valid token                    //
      // Then returns the lists receveid from the API            //
      //---------------------------------------------------------//
      axios
        .get('http://localhost:3001/posts', {
          headers: {
            GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
          },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, [authState.status, navigate]);
  //---------------------------------------------------------------------//
  // Create a function to like or unlike a post                          //
  // Makes a POST request that toggle the button on Like or unlike       //
  // Checks if the user has a valid token                                //
  // Then returns the response                                           //
  // Grabs the post in the posts list                                    //
  // If the id of the post is equal to the PostId                        //
  // If the post do not have a Like, returns it with only the like added //
  // Else if the post has a like, returns it with only the like removed  //
  // And else returns just the unmodified post                           //
  // If
  //---------------------------------------------------------------------//
  const likeOrNot = (postId) => {
    axios
      .post(
        'http://localhost:3001/likes',
        { PostId: postId },
        {
          headers: {
            GROUPOMANIA_TOKEN: sessionStorage.getItem('GROUPOMANIA_TOKEN'),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  //---------------------------------------------------//
  // Returns the data and display it by injecting HTML //
  //---------------------------------------------------//
  return (
    <div className="posts">
      {listOfPosts.map((value, key) => {
        return (
          <div className="posts_single" key={key}>
            <div className="posts_single_header">{value.title}</div>
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
                <ThumbUpIcon
                  className={
                    likedPosts.includes(value.id)
                      ? 'posts_single_footer_buttons_like'
                      : 'posts_single_footer_buttons_unlike'
                  }
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
//-----------------------//
// Exports Home function //
//-----------------------//
export default Home;
