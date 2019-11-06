/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Caro game
            </a>
          </div>
          <div id="navbar-right" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/" className="btn btn-link">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
