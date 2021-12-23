//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//----------------------------//
// Create a Register function //
//----------------------------//
function Register() {
  let navigate = useNavigate();
  //-------------------------------------------//
  // Define the initial values ​​of the new user //
  //-------------------------------------------//
  const initialValues = {
    username: '',
    password: '',
    confirmation: '',
  };
  //-----------------------------------//
  // Define the form validation schema //
  //-----------------------------------//
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required('Veuillez remplir ce champ.'),
    password: Yup.string()
      .min(6)
      .max(18)
      .required('Veuillez remplir ce champ, entre 6 et 18 caractères.'),
    confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Le mot de passe doit être identique.'
      )
      .required('Veuillez confirmer votre mot de passe.'),
  });
  //------------------------------------------------------//
  // Create an onSubmit function containing the form data //
  // Make a POST request including the data variable      //
  // Send to Login page                                   //
  //------------------------------------------------------//
  const onSubmit = (data) => {
    axios.post('http://localhost:3001/users/register', data).then(() => {
      navigate('/');
    });
  };
  //---------------------------//
  // Return the HTML to inject //
  //---------------------------//
  return (
    <div className="registerContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <p>Créer un compte</p>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            className="inputCreateUser"
            name="username"
            placeholder=" Votre nom d'utilisateur..."
          />
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autoComplete="off"
            className="inputCreateUser"
            name="password"
            placeholder=" Votre mot de passe..."
          />
          <ErrorMessage name="confirmation" component="span" />
          <Field
            type="password"
            autoComplete="off"
            className="inputCreateUser"
            name="confirmation"
            placeholder=" Confirmer votre mot de passe..."
          />
          <button type="submit">Valider</button>
        </Form>
      </Formik>
    </div>
  );
}
//--------------------------//
// Export Register function //
//--------------------------//
export default Register;
