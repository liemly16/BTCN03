/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

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
                <a href="/login">
                  Login
                </a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
