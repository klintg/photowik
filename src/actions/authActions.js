export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}


//calls the Api to get a token and dispatches actions along the way
const CLIENT_URL = 'http://localhost:7000';

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }),
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({ email: creds.email, password: creds.password })
  };
  console.log(config.body); //eslint-disable-line no-console
  return dispatch => {
    //we dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('http://localhost:7000/signin', config)
      .then(response =>
        response.json().then(user => ({ user, response}))
      ).then(({ user, response }) => {
        if (!response.ok) {
          //if there is a proble we want to dispatch the error actions
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          //if the login was successful set the token in local storage
          localStorage.setItem('token', user.token);
          //dispatch the success action
          dispatch(receiveLogin(user));
          window.location.href = CLIENT_URL + '/home';
        }
      }).catch(err => console.log("Error: ", err)); // eslint-disable-line no-console
  };
}


// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

//logging the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(receiveLogout());
  };
}


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  };
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

//we will call the signUser and pass it the credentials as we
//call the actions along the way.
export function signUser(creds) {
  let config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }),
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({ email: creds.email, password: creds.password })
  };
  console.log(config.body); //eslint-disable-line no-console
  return dispatch => {
    //we dispatch requestSignup to kickoff the call to the API
    dispatch(requestSignup(creds));

    return fetch('http://localhost:7000/signup', config)
      .then(response =>
        response.json().then(user => ({ user, response}))
      ).then(({ user, response }) => {
        if (!response.ok) {
          //if there is a proble we want to dispatch the error actions
          dispatch(signupError(user.message));
          return Promise.reject(user);
        } else {
          //if the login was successful set the token in local storage
          localStorage.setItem('token', user.token);
          //dispatch the success action
          dispatch(receiveSignup(user));
          window.location.href = CLIENT_URL + '/home';
        }
      }).catch(err => console.log("Error: ", err)); // eslint-disable-line no-console
  };
}
