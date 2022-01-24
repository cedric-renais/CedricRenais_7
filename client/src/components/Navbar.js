//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, Link } from 'react-router-dom';
import Signout from './Sign/signout';
import { AuthContext } from '../helpers/authContext';
//----------------------------------------//
// Starting point of the Navbar component //
//----------------------------------------//
function Navbar() {
  //----------------------------------//
  // Declaration of the useState hook //
  //----------------------------------//
  const { authState } = useContext(AuthContext);
  const profil = () => {
    window.location.replace(`/user/${authState.id}`);
  };
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <nav>
      <div className="navbar">
        <div>
          <span className="navbar_welcome">
            Bienvenue {authState.username} !
          </span>
        </div>
        <NavLink to={'/home'}>
          <HomeIcon aria-label="bouton accueil" className="navbar_icon" />
        </NavLink>
        <PersonIcon
          onClick={profil}
          aria-label="bouton profil"
          className="navbar_icon"
        />
        <Signout />
      </div>
    </nav>
  );
}
//-----------------------------------------//
// Exportation of the log Navbar component //
//-----------------------------------------//
export default Navbar;
