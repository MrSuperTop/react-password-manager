import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth/authContext';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const links = document.querySelectorAll('.links-container li');
    for (let link of links) {
      link.classList.remove('current');

      if (link.children[0].getAttribute('href') === location.pathname) {
        link.classList.add('current');
      }
    }
  }, [location]);

  return (
    <nav className="bg-dark">
      <div className="logo-container">
        <Link to="/home" className="logo">Password Manager</Link>
      </div>
      <ul className="links-container">
        <li className="link">
          <Link to="/home">Home</Link>
        </li>
        <li className="link">
          <Link to="/about">About</Link>
        </li>
        <li className="link">
          <Link to="/create">Add</Link>
        </li>
        <button
          className="btn btn-danger"
          onClick={auth.logOut}
        >
          Log Out
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
