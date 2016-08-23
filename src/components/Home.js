import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render() {
    return (
      <div className="jumbotron">
        <Link to="login" className="btn btn-primary btn-lg">Login</Link>
        <br></br>
        <Link to="signup" className="btn btn-primary btn-lg">Signup</Link>
      </div>
    );
  }
}

export default HomePage;
