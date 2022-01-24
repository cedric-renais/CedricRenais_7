//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
//-----------------------------------------//
// Starting point of the Signout component //
//-----------------------------------------//
function Signout() {
  //---------------------------------------------//
  // Deletion of the token in the sessionStorage //
  //---------------------------------------------//
  const Signout = () => {
    sessionStorage.removeItem('JWToken');
    window.location.replace('/');
  };
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <div onClick={Signout}>
      <LogoutIcon alt="bouton déconnexion" className="navbar_icon" />
    </div>
  );
}
//------------------------------------------//
// Exportation of the log Signout component //
//------------------------------------------//
export default Signout;
