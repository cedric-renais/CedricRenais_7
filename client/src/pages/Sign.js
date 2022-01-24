//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignComponent from '../components/Sign';
//---------------------------------//
// Starting point of the Sign page //
//---------------------------------//
function Sign() {
  //-------------------------//
  // Declaration of the hook //
  //-------------------------//
  let navigate = useNavigate();
  //-----------------------------------------------------------//
  // Execute this function immediately when the page is opened //
  //-----------------------------------------------------------//
  useEffect(() => {
    if (sessionStorage.getItem('JWToken')) {
      navigate('/home');
    }
  }, []);
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <div className="page_container">
      <SignComponent signin={true} signup={false} />
    </div>
  );
}
//------------------------------//
// Exportation of the Sign page //
//------------------------------//
export default Sign;
