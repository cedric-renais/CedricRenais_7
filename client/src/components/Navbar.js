//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React, { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import Signout from './Sign/signout';
import { AuthContext } from '../helpers/authContext';

function Navbar() {
  const { authState } = useContext(AuthContext);

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
        <NavLink to={`/user/${authState.id}`}>
          <PersonIcon aria-label="bouton profil" className="navbar_icon" />
        </NavLink>
        <Signout />
      </div>
    </nav>
  );
}

export default Navbar;
