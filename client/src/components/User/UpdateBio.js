import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';

function UpdateBio() {
  const [biography, setBiography] = useState('');
  const [biographyForm, setBiographyForm] = useState(false);
  const { authState } = useContext(AuthContext);
  let { id } = useParams();
  const initialValues = {
    biography: `${biography}`,
  };

  useEffect(() => {
    //-----------------------------------//
    // Makes GET request to get username //
    //-----------------------------------//
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setBiography(res.data.biography);
      });
  }, []);

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
          setBiography(res.data.image);
          window.location.replace(`/user/${authState.id}`);
        }
      });
  };
  return (
    <div className="user_biography">
      {biographyForm === false && (
        <>
          <p onClick={() => setBiographyForm(!biographyForm)}>{biography}</p>
          <button
            onClick={() => setBiographyForm(!biographyForm)}
            aria-label="modifier"
          >
            <EditIcon />
          </button>
        </>
      )}
      {biographyForm && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleUpdateBio}>
            <Form>
              <br />
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

export default UpdateBio;
