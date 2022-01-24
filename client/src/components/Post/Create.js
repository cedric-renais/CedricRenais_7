//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
//---------------------------//
// Start of Create component //
//---------------------------//
function Create() {
  //--------------------------//
  // Declare useNavigate hook //
  //--------------------------//
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  //-----------------------------------//
  // POST request to create a new post //
  //-----------------------------------//
  const handlePost = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('content', content);
    data.append('image', image);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.replace('/home');
      });
  };
  //------------//
  // Vitual DOM //
  //------------//
  return (
    <div className="create">
      <form className="create_form" onSubmit={handlePost}>
        <textarea
          name="content"
          id="content"
          placeholder="Quoi de neuf ?"
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
        <button className="create_button" type="submit" aria-label="valider">
          <DoneIcon />
        </button>
      </form>
    </div>
  );
}
//-------------------------//
// Export Create component //
//-------------------------//
export default Create;
