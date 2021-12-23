//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React from 'react';
import PageNotFoundImg from '../images/icon-above-font.png';
//------------------------------------------------------//
// If the User is connected redirects to the posts page //
// Or to the Login page if the user is not logged in    //
//------------------------------------------------------//
function PageNotFound() {
  return (
    <div className="pageNotFound">
      <img className="pageNotFound_Img" src={PageNotFoundImg} alt="Logo" />
      <p>Cette page n'existe pas...</p>
      <p>
        <a href="/posts" className="pageNotFound_Link">
          Cliquez ici
        </a>
      </p>
    </div>
  );
}
//-----------------------------------//
// Export the PageNotFound function  //
//-----------------------------------//
export default PageNotFound;
