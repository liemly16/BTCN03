/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavbarComponent extends React.Component {

  render() {
    const { user } = this.props;

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                Caro game
              </Link>
            </div>
            <div id="navbar-right" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  {!user.isLoggedIn ? (
                    <Link to="/register" className="btn btn-link">
                      Register
                    </Link>
                  ) : null}
                </li>
                <li>
                  {!user.isLoggedIn ? (
                    <Link to="/login" className="btn btn-link">
                      Login
                    </Link>
                  ) : null}
                </li>

                <li>
                  {user.isLoggedIn ? (
                    <Link to="/" className="btn btn-link">
                      Home
                    </Link>
                  ) : null}
                </li>

                <li>
                  {user.isLoggedIn ? (
                    <Link to="/information" className="btn btn-link">
                      Information
                    </Link>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    
  };
};

export default connect(mapStateToProps)(NavbarComponent);
