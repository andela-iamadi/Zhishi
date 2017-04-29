import Auth from '../auth';
import fetch from 'isomorphic-fetch';
import isEmpty from './isEmpty';
import {param} from 'jquery';
import checkIsLoggedIn from '../actions/AuthActions';
import store from '../stores/configureStore';
import CVar from '../config/CookieVariables.js';
import cookie from 'js-cookie';

const requestPath = (path, method, data = {}) => {
  if (method === 'GET' && !isEmpty(data)) {
    return path + '?' + decodeURIComponent(param(data));
  }

  return path;
};

const requestBody = (data, method) => {
  return method === 'GET' ?
    null : JSON.stringify(data);
};

const redirectIfUnauthorized = response => {
  if (response.status === 401) {
    Auth.logoutUser();
    if (location.pathname === '/login') {
      store.dispatch(checkIsLoggedIn());
    }
    window.location = '/login';
    return null;
  }
  return response.json();
};

/**
* @return {Object} Headers containing auth details
*/
export function requestHeaders() {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + Auth.getCurrentUserToken()
  });
}

export const processUserPreference = (url, token, method, body = {}) => {
  return fetch(url, {
    method,
    mode: 'cors',
    headers: {
      'Authorization': `Token token=${token}`,
      'Content-Type': 'application/json'
    },
    body: requestBody(body, method)
  })
  .then(res => res.text())
  .then(res => res.length ? JSON.parse(res) : {})
  .catch(error => {
    throw error;
  });
};

/**
* @param {String} path: eg '/questions'
* @param {String} method: eg 'POST'
* @param {Object} data: eg {id: 1}
* @param {Function} callback: usually an action
* @return {Object} fetch: to be used in views that check for success or failure
*/
export function processRequest(path, method, data = {}) {
  let url = cookie.get(CVar.apiUrl) + requestPath(path, method, data);
  return fetch(url, {
    method: method,
    headers: requestHeaders(),
    mode: 'cors',
    cache: 'default',
    body: requestBody(data, method)
  })
  .then(response => redirectIfUnauthorized(response))
  .catch(err => {
    throw (err);
  });
}
