/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { userService } from '../services';

export const userConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE'
};

function login(ownProps, username, password) {
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user, token) {
    return { type: userConstants.LOGIN_SUCCESS, user, token };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password).then(
      res => {
        ownProps.history.push('/');
        alert("Bạn đã đăng nhập thành công");
        dispatch(success(res.result.user, res.result.token));
      },
      error => {
        alert("Đăng nhập thất bại");
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
export const userActions = { login };
