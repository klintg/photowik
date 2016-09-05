import React, { Component, PropTypes } from 'react';
import Login from './Login';
import { loginUser, logoutUser } from '../actions/authActions';
import {Link} from 'react-router';
import Logout from "./Logout";

export default class Navbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <nav className="navbar navbar-default container">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PhotoWick</a>
          <div className="navbar-form">

            {!isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={creds => dispatch(loginUser(creds))}
              />
            }

            {!isAuthenticated &&
              <Link to="signup"><button btn btn-default>Signup</button></Link>
            }

            {isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} />
            }

          </div>
        </div>
      </nav>
    );
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};
