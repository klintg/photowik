import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/login" activeClassName="active">Login</Link>
      {" | "}
      <Link to="/register" activeClassName="active">Signup</Link>
      {" | "}
      <Link to="/pic" activeClassName="active">Pictures</Link>
    </nav>
  );
};

export default Header;
