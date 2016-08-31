import React, {Component, PropTypes} from 'react';
import {signUser, logoutUser} from '../actions/authActions';
import {connect} from 'react-redux';
import SignupForm from './SignupForm';
import Logout from './Logout';

class Signup extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div>
        {!isAuthenticated &&
          <SignupForm
            onSignupClick={creds => dispatch(signUser(creds))}
            />
        }

        {isAuthenticated &&
          <Logout onLogoutClick={() => dispatch(logoutUser())} />
        }
      </div>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(Signup);
