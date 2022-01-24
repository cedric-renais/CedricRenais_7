//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
//-------------------------------------------//
// Starting point of the UpdateBio component //
//-------------------------------------------//
function UpdateBio() {
  //--------------------------//
  // Declaration of the hooks //
  //--------------------------//
  const [username, setUsername] = useState('');
  const [biography, setBiography] = useState('');
  const [biographyForm, setBiographyForm] = useState(false);
  const { authState } = useContext(AuthContext);
  let { id } = useParams();
  //-----------------------------------------------//
  // Declaration of the initial values ​​of the form //
  //-----------------------------------------------//
  const initialValues = {
    biography: `${biography}`,
  };
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
        setBiography(res.data.biography);
        setUsername(res.data.username);
      });
  }, []);
  //-------------//
  // PUT request //
  //-------------//
  const handleUpdateBio = (data) => {
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
          setBiography(res.data.biography);
          window.location.replace(`/user/${authState.id}`);
        }
      });
  };
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <div className="user_biography">
      {biographyForm === false && (
        <>
          <p>{biography}</p>
          {(authState.username === username && (
            <>
              <button
                onClick={() => setBiographyForm(!biographyForm)}
                aria-label="modifier"
              >
                <EditIcon />
              </button>
            </>
          )) ||
            (authState.isAdmin === true && (
              <>
                <button
                  onClick={() => setBiographyForm(!biographyForm)}
                  aria-label="modifier"
                >
                  <EditIcon />
                </button>
              </>
            ))}
        </>
      )}
      {biographyForm && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleUpdateBio}>
            <Form>
              <Field
                as="textarea"
                aria-label="biographie"
                name="biography"
                placeholder={authState.biography}
                autoComplete="off"
              />
              <button type="submit" aria-label="modifier">
                <DoneIcon />
              </button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
}
//----------------------------------------//
// Exportation of the UpdateBio component //
//----------------------------------------//
export default UpdateBio;
