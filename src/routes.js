import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage.js';
import HomePage from './components/HomePage';
import Home from './components/Home';
import Signup from './common/Signup';
import RequireAuth from './components/require-authentication';

export default (
  <Route path="/" component={Home}>
    <Route path="home" component={RequireAuth(HomePage)}/>
    <Route path="signup" component={Signup}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
