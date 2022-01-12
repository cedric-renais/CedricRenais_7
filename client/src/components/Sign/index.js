//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
//---------------------------------//
// Starting point of the index log //
//---------------------------------//
function Index(props) {
  //-----------------------------------//
  // Declaration of the useState hooks //
  //-----------------------------------//
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  //----------------------//
  // Modals toggle system //
  //----------------------//
  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === 'signin') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  //-----------------//
  // HTML to display //
  //-----------------//
  return (
    <div className="sign">
      <div className="sign_list">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? 'sign_active' : null}
          >
            S'inscrire
          </li>
          <br />
          <li
            onClick={handleModals}
            id="signin"
            className={signInModal ? 'sign_active' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <Signup />}
        {signInModal && <Signin />}
      </div>
    </div>
  );
}
//----------------------------------------//
// Exportation of the log index component //
//----------------------------------------//
export default Index;
