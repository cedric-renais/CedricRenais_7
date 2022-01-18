//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
//-----------------------------//
// Creates CreatePost function //
//-----------------------------//
function Create() {
  //-------------------------------------------//
  // Declares useNavigate and useContext hooks //
  //-------------------------------------------//
  const [content, setContent] = useState('');
  const [image, setImage] = useState();

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
  //--------------//
  // Injects HTML //
  //--------------//
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
//-----------------------------//
// Exports CreatePost function //
//-----------------------------//
export default Create;
