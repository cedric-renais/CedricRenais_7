import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/authContext';
import { useParams } from 'react-router-dom';
function Upload() {
  let { id } = useParams();
  const [image, setImage] = useState('');
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setEmail(res.data.email);
      });
  }, []);

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
    <>
      {authState.email === email && (
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
      )}
    </>
  );
}

export default Upload;
