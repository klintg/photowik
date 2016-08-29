const BASE_URL = 'http://localhost:7000/';

function callApi(endpoint, authenticated) {
  let token = localStorage.getItem('token') || null;
  let config = {};

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `${token}`}
      };
    }
    else {
      throw "No token saved";
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if(!response.ok) {
        return Promise.reject(text);
      }

      return text;
    }).catch(err => console.log(err)); //eslint-disable-line no-console
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  //so the middleware doesn't get applied to every single action
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated } = callAPI;

  const [ requestType, successType, errorType ] = types;

  //Passing the authenticated boolean back in out data will let
  //us distiguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(response => next ({
    response,
    authenticated,
    type: successType
  }),
  error => next({
    error: error.message || 'ther was an error.',
    type: errorType
  })
);
};
