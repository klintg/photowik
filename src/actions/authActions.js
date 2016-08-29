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

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
