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
    title: '',
    message: '',
  };
  //-----------------------------------//
  // Defines the form validation schema //
  //-----------------------------------//
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Veuillez remplir ce champ.'),
    message: Yup.string().required('Veuillez remplir ce champ.'),
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
      .post('http://localhost:3001/api/posts', data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        console.log('New post created.');
        navigate('/');
      });
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="createPost">
      <h1>Créer un nouveau post</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="createPost_form">
          <ErrorMessage name="title" component="span" />
          <Field
            className="createPost_form_input"
            name="title"
            placeholder="Votre titre..."
            autoComplete="off"
          />
          <ErrorMessage name="message" component="span" />
          <Field
            className="createPost_form_input_message"
            name="message"
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
