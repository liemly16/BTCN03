/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import config from '../config';

/* eslint-disable import/prefer-default-export */

class UserService {
  register(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    return fetch(`${config.host}/user/register`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        return user;
      });
  }

  login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    return fetch(`${config.host}/user/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        return user;
      });
  }

  getInfo() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    return fetch(`${config.host}/me`, requestOptions)
      .then(handleResponse)
      .then(user => {
        return user;
      });
  }

  updateInfo(name, gender) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, gender })
    };

    return fetch(`${config.host}/info`, requestOptions)
      .then(handleResponse)
      .then(user => {
        return user;
      });
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

const userService = new UserService();

export { userService };
