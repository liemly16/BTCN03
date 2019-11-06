import { userConstants } from '../actions/user';

const initState = {
  isLoggedIn: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        ...{
          isLoggedIn: true,
          user: action.user,
          token: action.token
        }
      };
    }
    case userConstants.LOGIN_FAILURE:
    case userConstants.LOGIN_REQUEST:
      return state;
    default:
      return state;
  }
};
