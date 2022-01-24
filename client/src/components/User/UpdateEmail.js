//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
//---------------------------------------------//
// Starting point of the UpdateEmail component //
//---------------------------------------------//
function UpdateEmail() {
  let { id } = useParams();
  const [email, setEmail] = useState('');
  const [emailForm, setEmailForm] = useState(false);
  const { authState } = useContext(AuthContext);
  //-----------------------------------------------//
  // Declaration of the initial values ​​of the form //
  //-----------------------------------------------//
  const initialValues = {
    email: `${authState.email}`,
  };
  //-------------------------------------------//
  // Declaration of the form validation schema //
  //-------------------------------------------//
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email non valide (nom@email.com)')
      .required('Veuillez remplir ce champ'),
  });
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
  const handleUpdateEmail = (data) => {
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
          setEmail({ ...email, email: email });
          window.location.replace(`/user/${authState.id}`);
        }
      });
  };
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <>
      {authState.email === email && (
        <>
          <div className="user_email">
            {emailForm === false && (
              <>
                <button
                  onClick={() => setEmailForm(!emailForm)}
                  aria-label="modifier"
                >
                  Modifier votre email
                </button>
              </>
            )}
            {emailForm && (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdateEmail}
                >
                  <Form>
                    <br />
                    <ErrorMessage name="email" component="span" />
                    <br />
                    <Field
                      aria-label="votre adresse email"
                      name="email"
                      placeholder={authState.email}
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
        </>
      )}
    </>
  );
}
//------------------------------------------//
// Exportation of the UpdateEmail component //
//------------------------------------------//
export default UpdateEmail;
