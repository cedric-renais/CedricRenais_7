//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Signin from './Signin';
//----------------------------------------//
// Starting point of the Signup component //
//----------------------------------------//
function Signup() {
  //----------------------------------//
  // Declaration of the useState hook //
  //----------------------------------//
  const [formSubmit, setFormSubmit] = useState(false);
  //-----------------------------------------------//
  // Declaration of the initial values ​​of the form //
  //-----------------------------------------------//
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmation: '',
  };
  //-------------------------------------------//
  // Declaration of the form validation schema //
  //-------------------------------------------//
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Au moins 3 caractères')
      .max(15, 'Pas plus de 15 caractères')
      .required('Veuillez remplir ce champ'),
    email: Yup.string()
      .email('Email non valide (nom@email.com)')
      .required('Veuillez remplir ce champ'),
    password: Yup.string()
      .min(6, 'Au moins 6 caractères')
      .max(18, 'Pas plus de 18 caractères')
      .required('Veuillez remplir ce champ')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/,
        'Doit contenir une majuscule, une minuscule et un chiffre '
      ),
    confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes ne correspondent pas'
      )
      .required('Veuillez remplir ce champ'),
  });
  //------------------------------------------------------------//
  // Creation of the onSubmit function containing the form data //
  //------------------------------------------------------------//
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/sign/signup`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setFormSubmit(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <>
      {formSubmit ? (
        <>
          <Signin />
          <br />
          <div>
            <p className="sign_valid">
              Inscription validé, veuillez vous à présent vous connecter !
            </p>
          </div>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="sign_form">
            <h1>Créer un compte</h1>
            <br />
            <ErrorMessage name="username" component="span" />
            <br />
            <Field
              aria-label="votre nom d'utilisateur"
              className="sign_form_input"
              name="username"
              placeholder="Votre nom d'utilisateur"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="email" component="span" />
            <br />
            <Field
              aria-label="votre adresse email"
              className="sign_form_input"
              name="email"
              placeholder="Votre adresse email"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="password" component="span" />
            <br />
            <Field
              aria-label="votre mot de passe"
              className="register_form_input"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="confirmation" component="span" />
            <br />
            <Field
              aria-label="confirmer votre mot de passe"
              className="sign_form_input"
              type="password"
              name="confirmation"
              placeholder="Confirmez votre mot de passe"
              autoComplete="off"
            />
            <br />
            <button
              className="sign_form_button"
              type="submit"
              aria-label="valider"
            >
              Valider
            </button>
          </Form>
        </Formik>
      )}
    </>
  );
}
//-----------------------------------------//
// Exportation of the log Signup component //
//-----------------------------------------//
export default Signup;
