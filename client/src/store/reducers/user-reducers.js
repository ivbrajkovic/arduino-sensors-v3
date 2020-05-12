/**
 * User reducer
 */

import {
  SET_USER,
  SET_LOGIN,
  CLEAR_LOGIN,
  LOGIN_USER,
  LOGOUT_USER
} from '../types';

const initialState = {
  login: false,
  details: {}
};

const userReducer = (state = initialState, action) => {
  console.log('uiReducer -> action.type', action.type);

  switch (action.type) {
    case SET_USER:
      return { login: true, details: action.payload };

    case SET_LOGIN:
      return { ...state, login: true };

    case CLEAR_LOGIN:
      return { ...state, login: false };

    case LOGIN_USER:
      return { login: true, details: action.payload };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
