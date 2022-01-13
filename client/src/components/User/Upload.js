import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/authContext';

function Upload() {
  const [image, setImage] = useState('');
  const { authState } = useContext(AuthContext);

  const handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/update/${authState.id}`,
        data,
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage({ ...image, image: data });
          window.location.replace(`/user/${authState.id}`);
        }
      });
  };

  return (
    <form onSubmit={handleUpload} className="upload">
      <br />
      <input
        type="file"
        id="image"
        name="image"
        accept=".jpeg, .jpg, .png, .gif, .webp"
        onChange={(event) => setImage(event.target.files[0])}
        aria-label="modifier votre image"
      />
      <br />
      <button type="submit" aria-label="valider">
        Modifier
      </button>
    </form>
  );
}

export default Upload;
