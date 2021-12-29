//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//---------------------------//
// Creates Register function //
//---------------------------//
function Register() {
  //---------------------------//
  // Declares useNavigate hook //
  //---------------------------//
  let navigate = useNavigate();
  //-------------------------------------------------//
  // Defines the initial values ​​of the new post form //
  //-------------------------------------------------//
  const initialValues = {
    username: '',
    password: '',
    confirmation: '',
  };
  //------------------------------------//
  // Defines the form validation schema //
  //------------------------------------//
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required('Veuillez remplir ce champ (entre 3 et 15 caractères).'),
    password: Yup.string()
      .min(6)
      .max(18)
      .required('Veuillez remplir ce champ (entre 6 et 18 caractères).'),
    confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes doivent être identiques.'
      )
      .required('Veuillez confirmer votre mot de passe.'),
  });
  //-------------------------------------------------------//
  // Creates an onSubmit function containing the form data //
  // Makes a POST request including the data               //
  //-------------------------------------------------------//
  const onSubmit = (data) => {
    axios
      .post('http://localhost:3001/users/register', data)
      .then((response) => {
        alert(
          'Votre compte a bien été crée, veuillez à présent vous connecter'
        );
        navigate('/');
      });
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="register">
      <h1>S'enregistrer</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="register_form">
          <ErrorMessage name="username" component="span" />
          <Field
            className="register_form_input"
            name="username"
            placeholder="Votre nom d'utilisateur..."
            autoComplete="off"
          />
          <ErrorMessage name="password" component="span" />
          <Field
            className="register_form_input"
            type="password"
            name="password"
            placeholder="Votre mot de passe..."
            autoComplete="off"
          />
          <ErrorMessage name="confirmation" component="span" />
          <Field
            className="register_form_input"
            type="password"
            name="confirmation"
            placeholder="Confirmez votre mot de passe..."
            autoComplete="off"
          />
          <button className="register_form_button" type="submit">
            Valider
          </button>
        </Form>
      </Formik>
    </div>
  );
}
//---------------------------//
// Exports Register function //
//---------------------------//
export default Register;
