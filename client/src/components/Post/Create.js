//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
//-----------------------------//
// Creates CreatePost function //
//-----------------------------//
function Create() {
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
      navigate('/');
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
        window.location.replace('/home');
      });
  };
  //--------------//
  // Injects HTML //
  //--------------//
  return (
    <div className="create">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="create_form">
          <Field
            aria-label="votre message"
            className="create_input"
            name="content"
            placeholder="Quoi de neuf ?"
            autoComplete="off"
            as="textarea"
          />
          <button className="create_button" type="submit" aria-label="valider">
            <DoneIcon />
          </button>
        </Form>
      </Formik>
    </div>
  );
}
//-----------------------------//
// Exports CreatePost function //
//-----------------------------//
export default Create;
