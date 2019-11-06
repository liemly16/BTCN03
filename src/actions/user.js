/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { userService } from '../services';

export const userConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  GET_INFO_REQUEST: 'GET_INFO_REQUEST',
  GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
  GET_INFO_FAILURE: 'GET_INFO_FAILURE',
  UPDATE_INFO_REQUEST: 'UPDATE_INFO_REQUEST',
  UPDATE_INFO_SUCCESS: 'UPDATE_INFO_SUCCESS',
  UPDATE_INFO_FAILURE: 'UPDATE_INFO_FAILURE'
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
        localStorage.setItem('user', JSON.stringify(res.result.user));
        localStorage.setItem('token', res.result.token);
        alert('Bạn đã đăng nhập thành công');
        dispatch(success(res.result.user, res.result.token));
        ownProps.history.push('/');
      },
      error => {
        alert('Đăng nhập thất bại');
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function register(username, password, ownProps) {
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success() {
    return { type: userConstants.REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    userService.register(username, password).then(
      () => {
        ownProps.history.push('/login');
        alert('Đăng ký tài khoản thành công');
        dispatch(success());
      },
      error => {
        alert('Đăng ký thất bại');
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getInfo() {
  function request() {
    return { type: userConstants.GET_INFO_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_INFO_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_INFO_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    userService.getInfo().then(
      res => {
        dispatch(success(res.result.user));
      },
      error => {
        alert('Lấy thông tin thất bại');
        dispatch(failure(error.toString()));
      }
    );
  };
}

function updateInfo(name, gender) {
  function request() {
    return { type: userConstants.UPDATE_INFO_REQUEST, };
  }
  function success(user) {
    return { type: userConstants.UPDATE_INFO_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_INFO_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    userService.updateInfo(name, gender).then(
      res => {
        alert('Cập nhật thông tin thành công');
        localStorage.setItem("user", JSON.stringify(res.result))
        dispatch(success(res.result));
      },
      error => {
        alert('Cập nhật thông tin thất bại');
        dispatch(failure(error.toString()));
      }
    );
  };
}

export const userActions = { login, register, getInfo, updateInfo };
