//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from '../../pages/Sign';
import Home from '../../pages/Home';
import User from '../../pages/User';
import Post from '../../pages/Post';
//---------------------------------------//
// Starting point of the index component //
//---------------------------------------//
function index() {
  //-------------//
  // Virtual DOM //
  //-------------//
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Sign />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/user/:id" exact element={<User />} />
        <Route path="/home/:id" exact element={<Post />} />
      </Routes>
    </Router>
  );
}
//------------------------//
// Export index component //
//------------------------//
export default index;
