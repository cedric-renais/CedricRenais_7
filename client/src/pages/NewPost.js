//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';
//------------------------------------------------------//
// Create a NewPost function                            //
//------------------------------------------------------//
function NewPost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  //-------------------------------------------//
  // Define the initial values ​​of the new post //
  //-------------------------------------------//
  const initialValues = {
    title: '',
    message: '',
    username: '',
  };
  //-----------------------------------//
  // Define the form validation schema //
  //-----------------------------------//
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    message: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });
  //---------------------------------------------------------------------------------------//
  // Create an onSubmit function containing the form data                                  //
  // Check if the user is logged in or not                                                 //
  // If the user are not logged in, redirects to the login page when try to post a message //
  // Make a POST request including the data variable                                       //
  // Checks if the user has a valid JWToken                                                //
  // Send to Posts page                                                                    //
  //---------------------------------------------------------------------------------------//
  const onSubmit = (data) => {
    if (!authState.status) {
      navigate('/');
    } else {
      axios
        .post('http://localhost:3001/posts', data, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            navigate('/posts');
          }
        });
    }
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="newPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <p>Poster un nouveau message</p>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            className="inputNewPost"
            name="title"
            placeholder=" Titre..."
          />
          <ErrorMessage name="message" component="span" />
          <Field
            autoComplete="off"
            className="inputNewPost"
            name="message"
            placeholder=" Message..."
          />
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            className="inputNewPost"
            name="username"
            placeholder=" Nom d'utilisateur..."
          />
          <button type="submit">Valider</button>
        </Form>
      </Formik>
    </div>
  );
}
//-----------------------------//
// Export the NewPost function //
//-----------------------------//
export default NewPost;
