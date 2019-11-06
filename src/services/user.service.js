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

    return fetch(`${config.host}/users/register`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        return user;
      });
  }

  login(username, password) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    return fetch(`${config.host}/users/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        return user;
      });
  }
}

const userService = new UserService();

export { userService };
