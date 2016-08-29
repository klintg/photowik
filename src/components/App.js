import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from '../common/Header';

class App extends React.Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div className="container-fluid">
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
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
export default connect(mapStateToProps)(App);
