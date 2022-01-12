import React from 'react';
import Logo from '../image/icon-left-font-monochrome-white.png';

function Header() {
  return (
    <header className="container">
      <div>
        <img src={Logo} alt="Logo de groupomania entièrement blanc" />
      </div>
    </header>
  );
}

export default Header;
