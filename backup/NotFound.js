//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React from 'react';
import NotFoundImg from '../images/icon-above-font.png';
//--------------------------------//
// Create a PageNotFound function //
//--------------------------------//
function NotFound() {
  return (
    <div className="NotFound">
      <img
        className="NotFound_Img"
        src={NotFoundImg}
        alt="Logo de Groupomania"
      />
      <h1>Cette page n'existe pas...</h1>
      <a href="/" className="NotFound_Link">
        Retour à l'accueil
      </a>
    </div>
  );
}
//------------------------------//
// Export the NotFound function //
//------------------------------//
export default NotFound;
