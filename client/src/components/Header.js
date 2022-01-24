//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React from 'react';
import Logo from '../image/icon-left-font-monochrome-white.png';
//----------------------------------------//
// Starting point of the Header component //
//----------------------------------------//
function Header() {
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <header className="container">
      <div>
        <img src={Logo} alt="Logo de groupomania entièrement blanc" />
      </div>
    </header>
  );
}
//-----------------------------------------//
// Exportation of the log Header component //
//-----------------------------------------//
export default Header;
