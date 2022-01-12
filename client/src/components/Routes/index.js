//-------------------------------------------//
// Importation of the necessary dependencies //
//-------------------------------------------//
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from '../../pages/Sign';
import Home from '../../pages/Home';
import User from '../../pages/User';
function index() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Sign />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/user" exact element={<User />} />
      </Routes>
    </Router>
  );
}

export default index;
