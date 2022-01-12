//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//-----------------------------//
// Creates CreatePost function //
//-----------------------------//
function CreatePost() {
  //-------------------------------------------//
  // Declares useNavigate and useContext hooks //
  //-------------------------------------------//
  let navigate = useNavigate();
  //--------------------------------------------//
  // Defines the initial values ​​of the new post //
  //--------------------------------------------//
  const initialValues = {
    content: '',
  };
  //-----------------------------------//
  // Defines the form validation schema //
  //-----------------------------------//
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Veuillez remplir ce champ.'),
  });
  //---------------------------------------------------------------------//
  // Executes this function immediately when the page the page is opened //
  //---------------------------------------------------------------------//
  useEffect(() => {
    if (!sessionStorage.getItem('JWToken')) {
      navigate('/login');
    }
  }, []);
  //------------------------------------------------------//
  // Creates an onSubmit function containing the form data //
  // Makes a POST request including the data               //
  //------------------------------------------------------//
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        console.log('New post created.');
        navigate('/home');
      });
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="createPost">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="createPost_form">
          <ErrorMessage name="content" component="span" />
          <Field
            aria-label="Votre message"
            className="createPost_form_input_message"
            name="content"
            placeholder="Votre message..."
            autoComplete="off"
            as="textarea"
          />
          <button className="createPost_form_button" type="submit">
            Valider
          </button>
        </Form>
      </Formik>
    </div>
  );
}
//-----------------------------//
// Exports CreatePost function //
//-----------------------------//
export default CreatePost;
