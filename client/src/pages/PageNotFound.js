//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
import React from 'react';
import PageNotFoundImg from '../images/icon-above-font.png';
//--------------------------------//
// Create a PageNotFound function //
//--------------------------------//
function PageNotFound() {
  return (
    <div className="pageNotFound">
      <img className="pageNotFound_Img" src={PageNotFoundImg} alt="Logo" />
      <p>Cette page n'existe pas...</p>
    </div>
  );
}
//----------------------------------//
// Export the PageNotFound function //
//----------------------------------//
export default PageNotFound;
