//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/authContext';
import { useParams } from 'react-router-dom';
//----------------------------------------//
// Starting point of the Upload component //
//----------------------------------------//
function Upload() {
  //-------------------------------------------------------------//
  // Declaration of the useState, useContext and useParams hooks //
  //-------------------------------------------------------------//
  let { id } = useParams();
  const [image, setImage] = useState('');
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  //-----------------------------------------------------------//
  // Execute this function immediately when the page is opened //
  //-----------------------------------------------------------//
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
  //-------------//
  // PUT request //
  //-------------//
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
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <>
      {(authState.email === email && (
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
      )) ||
        (authState.isAdmin === true && (
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
        ))}
    </>
  );
}
//-------------------------------------//
// Exportation of the Upload component //
//-------------------------------------//
export default Upload;
