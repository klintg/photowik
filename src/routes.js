import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/Home';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import PicturePage from './components/picture/PicturePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={LoginForm}/>
    <Route path="signup" component={Signup}/>
    <Route path="pic" component={PicturePage}/>
  </Route>
);
